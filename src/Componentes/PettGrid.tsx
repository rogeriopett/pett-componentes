import React, { useCallback, useMemo, useRef, useState } from "react";
import { PettColumn } from "./PettColumn";
import type { PettColumnProps } from "./PettColumn";
import "./PettGrid.css";

export interface PettGridProps {
    className?: string;
    children?: React.ReactNode;
    /** Linhas a exibir. Se vazio/undefined, o grid não renderiza nada. */
    listagem?: any[];
    /** Chamado quando o usuário clica numa linha (seleção única). */
    rowSelect?: (rowData: any, rowIndex: number) => void;
    /** Mostra a coluna "#" com o número sequencial da linha. */
    showIndex?: boolean;
    /** Zebra as linhas (fundo alternado). */
    stripedRows?: boolean;
    /** Mostra a linha divisória entre os registros (embaixo de cada célula). */
    showRowBorders?: boolean;
    /** Permite redimensionar colunas arrastando a borda do cabeçalho. */
    resizableColumns?: boolean;
    /** Altura máxima da área rolável (ex: "400px", "60vh"). Sem isso, o grid cresce naturalmente. */
    scrollHeight?: string;
    /** Mensagem exibida quando `listagem` está vazia. Se omitida, nada é renderizado (comportamento antigo). */
    emptyMessage?: string;
}

interface SortConfig {
    field: string;
    direction: "asc" | "desc";
}

interface ResizeState {
    colIndex: number;
    startX: number;
    startWidth: number;
}

const INDEX_COL_WIDTH = 50;
const DEFAULT_COL_WIDTH = 150;
const MIN_COL_WIDTH = 40;

/** Ícone de ordenação: duas setas (cima/baixo). A seta correspondente à
 * direção ativa fica em destaque (cor de acento); a outra some parcialmente.
 * Usa currentColor/var de acento, então acompanha o tema automaticamente. */
const SortIcon: React.FC<{ direction: "asc" | "desc" | null }> = ({ direction }) => (
    <svg
        className="pett-grid-sort-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="11"
        height="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline
            points="6 10 12 4 18 10"
            style={{
                opacity: direction === "asc" ? 1 : 0.35,
                stroke: direction === "asc" ? "var(--pett-color-accent, #2196f3)" : "currentColor",
            }}
        />
        <polyline
            points="6 14 12 20 18 14"
            style={{
                opacity: direction === "desc" ? 1 : 0.35,
                stroke: direction === "desc" ? "var(--pett-color-accent, #2196f3)" : "currentColor",
            }}
        />
    </svg>
);

export const PettGrid: React.FC<PettGridProps> = (props) => {
    const {
        className = "",
        children,
        listagem,
        rowSelect,
        showIndex = true,
        stripedRows = true,
        showRowBorders = true,
        resizableColumns = true,
        scrollHeight,
        emptyMessage,
    } = props;

    const wrapperRef = useRef<HTMLDivElement>(null);

    // Lê as colunas declaradas via <PettColumn /> nos children, ignorando qualquer outro elemento.
    const columns = useMemo(() => {
        return React.Children.toArray(children).filter(
            (child): child is React.ReactElement<PettColumnProps> =>
                React.isValidElement(child) && child.type === PettColumn
        );
    }, [children]);

    // Larguras: uma entrada por coluna visível (contando a coluna "#" quando houver).
    const initialWidths = useMemo(() => {
        const widths: number[] = [];
        if (showIndex) widths.push(INDEX_COL_WIDTH);
        columns.forEach((col) => widths.push(col.props.width ?? DEFAULT_COL_WIDTH));
        return widths;
    }, [columns, showIndex]);

    const [colWidths, setColWidths] = useState<number[]>(initialWidths);

    // Se o número de colunas mudar (children dinâmicos), resincroniza as larguras.
    const prevColumnsLength = useRef(initialWidths.length);
    if (prevColumnsLength.current !== initialWidths.length) {
        prevColumnsLength.current = initialWidths.length;
        setColWidths(initialWidths);
    }

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    // Redimensionamento: durante o arraste só a LINHA GUIA se move (resizeLineX);
    // a largura da coluna só é aplicada de fato no mouseup.
    const [resizeLineX, setResizeLineX] = useState<number | null>(null);
    const resizeState = useRef<ResizeState | null>(null);
    // Marca se o mouse se moveu durante o resize. O navegador dispara um
    // "click" sintético logo após o mouseup, tendo como alvo o <th> (não
    // mais a alcinha, que ficou pra trás quando a coluna encolheu) — sem
    // essa trava, esse clique fantasma dispara a ordenação da coluna.
    const didDragRef = useRef(false);

    const computeLineX = useCallback((clientX: number) => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return clientX;
        const rect = wrapper.getBoundingClientRect();
        return clientX - rect.left + wrapper.scrollLeft;
    }, []);

    const handleResizeMove = useCallback(
        (e: MouseEvent) => {
            if (!resizeState.current) return;
            didDragRef.current = true;
            setResizeLineX(computeLineX(e.clientX));
        },
        [computeLineX]
    );

    const handleResizeEnd = useCallback(
        (e: MouseEvent) => {
            const state = resizeState.current;
            if (state) {
                const delta = e.clientX - state.startX;
                const newWidth = Math.max(MIN_COL_WIDTH, state.startWidth + delta);
                setColWidths((prev) => {
                    const next = [...prev];
                    next[state.colIndex] = newWidth;
                    return next;
                });
            }
            resizeState.current = null;
            setResizeLineX(null);
            document.removeEventListener("mousemove", handleResizeMove);
            document.removeEventListener("mouseup", handleResizeEnd);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
            // O "click" sintético do navegador dispara logo após este mouseup,
            // ainda de forma síncrona/no mesmo ciclo — por isso a liberação
            // da trava vai pro fim da fila (setTimeout 0), depois que esse
            // clique (se houver) já tiver sido ignorado pelo handleSort.
            setTimeout(() => {
                didDragRef.current = false;
            }, 0);
        },
        [handleResizeMove]
    );

    const handleResizeStart = useCallback(
        (colIndex: number) => (e: React.MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            didDragRef.current = false;
            resizeState.current = {
                colIndex,
                startX: e.clientX,
                startWidth: colWidths[colIndex],
            };
            setResizeLineX(computeLineX(e.clientX));
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
            document.addEventListener("mousemove", handleResizeMove);
            document.addEventListener("mouseup", handleResizeEnd);
        },
        [colWidths, handleResizeMove, handleResizeEnd, computeLineX]
    );

    const handleSort = useCallback((field: string) => {
        if (didDragRef.current) return;
        setSortConfig((prev) => {
            if (!prev || prev.field !== field) return { field, direction: "asc" };
            if (prev.direction === "asc") return { field, direction: "desc" };
            return null; // terceiro clique: volta pra ordem original
        });
    }, []);

    const handleRowClick = useCallback(
        (rowData: any, rowIndex: number) => {
            setSelectedIndex(rowIndex);
            rowSelect?.(rowData, rowIndex);
        },
        [rowSelect]
    );

    const sortedListagem = useMemo(() => {
        if (!listagem || !sortConfig) return listagem;
        const { field, direction } = sortConfig;
        const copy = [...listagem];
        copy.sort((a, b) => {
            const va = a?.[field];
            const vb = b?.[field];
            if (va == null && vb == null) return 0;
            if (va == null) return 1;
            if (vb == null) return -1;
            if (typeof va === "number" && typeof vb === "number") {
                return direction === "asc" ? va - vb : vb - va;
            }
            const sa = String(va).toLowerCase();
            const sb = String(vb).toLowerCase();
            if (sa < sb) return direction === "asc" ? -1 : 1;
            if (sa > sb) return direction === "asc" ? 1 : -1;
            return 0;
        });
        return copy;
    }, [listagem, sortConfig]);

    const hasData = !!sortedListagem && sortedListagem.length > 0;

    if (!hasData) {
        if (!emptyMessage) return null;
        return (
            <div className={`pett-grid-empty ${className}`.trim()}>
                {emptyMessage}
            </div>
        );
    }

    const totalWidth = colWidths.reduce((sum, w) => sum + w, 0);

    return (
        <div
            ref={wrapperRef}
            className={`pett-grid-wrapper ${className}`.trim()}
            style={{
                ...(scrollHeight ? { maxHeight: scrollHeight } : {}),
                ...({ "--pett-grid-row-border-width": showRowBorders ? "1px" : "0px" } as React.CSSProperties),
            }}
        >
            <table className="pett-grid-table" style={{ width: totalWidth }}>
                <colgroup>
                    {colWidths.map((w, i) => (
                        <col key={i} style={{ width: w }} />
                    ))}
                </colgroup>
                <thead>
                    <tr>
                        {showIndex && (
                            <th className="pett-grid-th">
                                <span className="pett-grid-th-label">
                                    <span className="pett-grid-th-text">#</span>
                                </span>
                                {resizableColumns && (
                                    <span
                                        className="pett-grid-resize-handle"
                                        onMouseDown={handleResizeStart(0)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                )}
                            </th>
                        )}
                        {columns.map((col, i) => {
                            const colIndex = showIndex ? i + 1 : i;
                            const canResize = resizableColumns && col.props.resizable !== false;
                            const { field, sortable, headerStyle } = col.props;
                            const isSortable = !!sortable && !!field;
                            const isActiveSort = isSortable && sortConfig?.field === field;
                            return (
                                <th
                                    key={field ?? i}
                                    className={`pett-grid-th${isSortable ? " pett-grid-th-sortable" : ""}`}
                                    style={headerStyle}
                                    onClick={isSortable ? () => handleSort(field!) : undefined}
                                >
                                    <span className="pett-grid-th-label">
                                        <span className="pett-grid-th-text">{col.props.header}</span>
                                        {isSortable && (
                                            <SortIcon direction={isActiveSort ? sortConfig!.direction : null} />
                                        )}
                                    </span>
                                    {canResize && (
                                        <span
                                            className="pett-grid-resize-handle"
                                            onMouseDown={handleResizeStart(colIndex)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sortedListagem!.map((rowData, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`pett-grid-row${stripedRows && rowIndex % 2 === 1 ? " pett-grid-row-striped" : ""}${selectedIndex === rowIndex ? " pett-grid-row-selected" : ""}`}
                            onClick={() => handleRowClick(rowData, rowIndex)}
                        >
                            {showIndex && <td className="pett-grid-td">{rowIndex + 1}</td>}
                            {columns.map((col, i) => {
                                const { field, body, style } = col.props;
                                const content = body
                                    ? body(rowData, { rowIndex })
                                    : field
                                    ? rowData[field]
                                    : null;
                                return (
                                    <td
                                        key={field ?? i}
                                        className="pett-grid-td"
                                        style={{
                                            textAlign: col.props.align,
                                            ...style,
                                        }}
                                    >
                                        {content}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>

            {resizeLineX !== null && (
                <div className="pett-grid-resize-line" style={{ left: resizeLineX }} />
            )}
        </div>
    );
};

PettGrid.displayName = "PettGrid";