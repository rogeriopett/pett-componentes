import React from "react";

export interface PettColumnBodyOptions {
    rowIndex: number;
}

export interface PettColumnProps {
    /** Nome da propriedade lida em cada linha de `listagem` (ex: "nome"). */
    field?: string;
    /** Texto ou conteúdo do cabeçalho da coluna. */
    header?: React.ReactNode;
    /** Renderização customizada da célula. Recebe a linha inteira e o índice. */
    body?: (rowData: any, options: PettColumnBodyOptions) => React.ReactNode;
    /** Largura inicial da coluna (px). Pode ser redimensionada depois pelo usuário. */
    width?: number;
    /** Estilo aplicado a cada célula do corpo desta coluna. */
    style?: React.CSSProperties;
    /** Estilo aplicado ao cabeçalho desta coluna. */
    headerStyle?: React.CSSProperties;
    /** Alinhamento do conteúdo (atalho para text-align). */
    align?: "left" | "center" | "right";
    /** Desativa o redimensionamento apenas desta coluna (o grid continua redimensionável nas outras). */
    resizable?: boolean;
    /** Permite ordenar a listagem clicando no cabeçalho desta coluna (usa `field`). */
    sortable?: boolean;
}

/**
 * PettColumn não renderiza nada sozinho — ele é lido pelo PettGrid via
 * `React.Children` para montar a tabela. Existe só para dar uma API
 * declarativa (`<PettGrid><PettColumn .../><PettColumn .../></PettGrid>`),
 * do mesmo jeito que o Column do PrimeReact funcionava.
 */
export const PettColumn: React.FC<PettColumnProps> = () => null;

PettColumn.displayName = "PettColumn";