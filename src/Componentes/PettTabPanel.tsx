import React from "react";

export interface PettTabPanelProps {
    /** Texto (ou conteúdo) mostrado na aba. */
    header: React.ReactNode;
    children?: React.ReactNode;
    /** Desativa essa aba especificamente (não pode ser clicada/focada). */
    disabled?: boolean;
    /** Classe extra aplicada ao container do conteúdo desta aba. */
    className?: string;
}

/**
 * PettTabPanel não renderiza nada sozinho — é lido pelo PettTab via
 * `React.Children` para montar as abas, do mesmo jeito que o PettColumn
 * é lido pelo PettGrid.
 */
export const PettTabPanel: React.FC<PettTabPanelProps> = () => null;

PettTabPanel.displayName = "PettTabPanel";