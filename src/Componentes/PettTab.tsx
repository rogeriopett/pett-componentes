import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PettTabPanel } from "./PettTabPanel";
import type { PettTabPanelProps } from "./PettTabPanel";
import "./PettTab.css";

export interface PettTabProps {
    children?: React.ReactNode;
    /** Índice da aba ativa — passe isso junto com `onTabChange` pra controlar de fora. */
    activeIndex?: number;
    /** Índice da aba ativa inicial, quando não controlado por fora (padrão 0). */
    defaultActiveIndex?: number;
    /** Chamado sempre que o usuário troca de aba (clique ou teclado). */
    onTabChange?: (index: number) => void;
    /** Renderiza o conteúdo de TODAS as abas no DOM desde o início (as
     * inativas ficam com `hidden`), em vez de só montar a ativa. Útil quando
     * você precisa manter o estado de campos em abas escondidas, por exemplo. */
    renderAllPanels?: boolean;
    className?: string;
}

export const PettTab: React.FC<PettTabProps> = (props) => {
    const {
        children,
        activeIndex,
        defaultActiveIndex = 0,
        onTabChange,
        renderAllPanels = false,
        className = "",
    } = props;

    // Lê as abas declaradas via <PettTabPanel /> nos children, ignorando qualquer outro elemento.
    const panels = useMemo(() => {
        return React.Children.toArray(children).filter(
            (child): child is React.ReactElement<PettTabPanelProps> =>
                React.isValidElement(child) && child.type === PettTabPanel
        );
    }, [children]);

    // Controlado (activeIndex passado por fora) ou não controlado (estado interno).
    const isControlled = activeIndex !== undefined;
    const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
    const currentIndex = isControlled ? activeIndex! : internalIndex;

    const selectTab = useCallback(
        (index: number) => {
            if (panels[index]?.props.disabled) return;
            if (!isControlled) setInternalIndex(index);
            onTabChange?.(index);
        },
        [isControlled, onTabChange, panels]
    );

    // Setas/Home/End navegam entre as abas, pulando as desabilitadas.
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            const lastIndex = panels.length - 1;
            if (lastIndex < 0) return;

            const step = (from: number, delta: number): number => {
                let next = from;
                for (let i = 0; i <= lastIndex; i++) {
                    next = next + delta;
                    if (next < 0) next = lastIndex;
                    if (next > lastIndex) next = 0;
                    if (!panels[next]?.props.disabled) return next;
                }
                return from;
            };

            if (e.key === "ArrowRight") selectTab(step(currentIndex, 1));
            else if (e.key === "ArrowLeft") selectTab(step(currentIndex, -1));
            else if (e.key === "Home") selectTab(step(-1, 1));
            else if (e.key === "End") selectTab(step(lastIndex + 1, -1));
            else return;

            e.preventDefault();
        },
        [currentIndex, panels, selectTab]
    );

    // Indicador (a linha de baixo) que desliza de uma aba pra outra. Medido de
    // verdade a partir do botão ativo, então acompanha larguras diferentes por aba.
    const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    const measureIndicator = useCallback(() => {
        const el = tabRefs.current[currentIndex];
        if (el) {
            setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
        }
    }, [currentIndex]);

    useLayoutEffect(() => {
        measureIndicator();
    }, [measureIndicator, panels.length]);

    // Recalcula se a lista de abas mudar de largura (ex: responsivo, texto dinâmico).
    useEffect(() => {
        window.addEventListener("resize", measureIndicator);
        return () => window.removeEventListener("resize", measureIndicator);
    }, [measureIndicator]);

    const activePanel = panels[currentIndex];

    return (
        <div className={`pett-tab-container ${className}`.trim()}>
            <div className="pett-tab-list" role="tablist" onKeyDown={handleKeyDown}>
                {panels.map((panel, index) => {
                    const { header, disabled } = panel.props;
                    const isActive = index === currentIndex;
                    return (
                        <button
                            key={index}
                            ref={(el) => {
                                tabRefs.current[index] = el;
                            }}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            tabIndex={isActive ? 0 : -1}
                            disabled={disabled}
                            className={`pett-tab-header${isActive ? " pett-tab-header-active" : ""}`}
                            onClick={() => selectTab(index)}
                        >
                            {header}
                        </button>
                    );
                })}
                <span
                    className="pett-tab-indicator"
                    style={{ left: indicator.left, width: indicator.width }}
                />
            </div>

            {renderAllPanels
                ? panels.map((panel, index) => (
                      <div
                          key={index}
                          className={`pett-tab-panel ${panel.props.className ?? ""}`.trim()}
                          role="tabpanel"
                          hidden={index !== currentIndex}
                      >
                          {panel.props.children}
                      </div>
                  ))
                : activePanel && (
                      <div
                          className={`pett-tab-panel ${activePanel.props.className ?? ""}`.trim()}
                          role="tabpanel"
                      >
                          {activePanel.props.children}
                      </div>
                  )}
        </div>
    );
};

PettTab.displayName = "PettTab";