import React, { useCallback, useEffect } from "react";
import { PettButton } from "./PettButton";
import "./PettModal.css";

export type PettModalSize = "sm" | "md" | "lg";
export type PettModalPosition = "center" | "top";

export interface PettModalProps {
    /** Controla se o modal está visível. Quando false, nada é renderizado. */
    show: boolean;
    /** Chamado ao fechar (clique no X, no botão "Fechar", Esc ou clique no fundo). */
    onHide?: () => void;
    title?: React.ReactNode;
    children?: React.ReactNode;
    /** Largura do modal. Ignorado se `fullscreen` for true. */
    size?: PettModalSize;
    /** Onde o modal aparece na tela verticalmente. */
    position?: PettModalPosition;
    /** Modal ocupa a tela inteira, ignorando `size` e `position`. */
    fullscreen?: boolean;
    /** true: clique no fundo fecha. "static": clique no fundo não fecha. false: sem fundo escurecido. */
    backdrop?: "static" | boolean;
    /** Mostra o X no cabeçalho e o botão "Fechar" no rodapé. */
    fechar?: boolean;
    /** Tecla Esc fecha o modal. */
    keyboard?: boolean;
    className?: string;
}

/** Marca o conteúdo que deve ir pro rodapé do modal, em vez do corpo.
 * Uso: <PettModal><PettModalFooter><PettButton .../></PettModalFooter></PettModal>
 * (também disponível como PettModal.Footer). */
export const PettModalFooter: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <>{children}</>
);
PettModalFooter.displayName = "PettModalFooter";

const PettModalBase: React.FC<PettModalProps> = (props) => {
    const {
        show,
        onHide,
        title,
        children,
        size = "lg",
        position = "center",
        fullscreen = false,
        backdrop = "static",
        fechar = true,
        keyboard = true,
        className = "",
    } = props;

    // Trava o scroll da página enquanto o modal está aberto.
    useEffect(() => {
        if (!show) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [show]);

    // Esc fecha o modal (a menos que keyboard={false}).
    useEffect(() => {
        if (!show || !keyboard) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onHide?.();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [show, keyboard, onHide]);

    const handleBackdropMouseDown = useCallback(
        (e: React.MouseEvent) => {
            // Só conta clique no fundo em si, nunca em algo dentro da caixa do modal
            // (mesmo que o evento borbulhe até aqui).
            if (e.target !== e.currentTarget) return;
            if (backdrop === false || backdrop === "static") return;
            onHide?.();
        },
        [backdrop, onHide]
    );

    if (!show) return null;

    // Separa o <PettModalFooter> (se houver) do restante do conteúdo,
    // do mesmo jeito que a versão com react-bootstrap fazia.
    const subComponentes = React.Children.toArray(children);
    const footer = subComponentes.find(
        (child) => React.isValidElement(child) && child.type === PettModalFooter
    );
    const corpo = subComponentes.filter(
        (child) => !(React.isValidElement(child) && child.type === PettModalFooter)
    );

    const sizeClass = fullscreen ? "pett-modal-fullscreen" : `pett-modal-${size}`;
    const positionClass = fullscreen
        ? ""
        : position === "top"
        ? "pett-modal-align-top"
        : "pett-modal-align-center";

    return (
        <div
            className={`pett-modal-backdrop ${positionClass}`.trim()}
            onMouseDown={handleBackdropMouseDown}
        >
            <div
                className={`pett-modal-dialog ${sizeClass} ${className}`.trim()}
                role="dialog"
                aria-modal="true"
                aria-label={typeof title === "string" ? title : undefined}
            >
                <div className="pett-modal-header">
                    <h5 className="pett-modal-title">{title}</h5>
                    {fechar && (
                        <button
                            type="button"
                            className="pett-modal-close-btn"
                            onClick={onHide}
                            aria-label="Fechar"
                        >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="5" y1="5" x2="19" y2="19" />
                                <line x1="19" y1="5" x2="5" y2="19" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="pett-modal-body">{corpo}</div>

                <div className="pett-modal-footer">
                    {footer ?? (fechar && (
                        <PettButton
                            caption="Fechar"
                            icone="exit_sign"
                            onClick={onHide}
                            variant="dark"
                            responsivo={false}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

PettModalBase.displayName = "PettModal";

// Permite <PettModal.Footer> além de importar PettModalFooter separadamente.
export const PettModal = Object.assign(PettModalBase, { Footer: PettModalFooter });