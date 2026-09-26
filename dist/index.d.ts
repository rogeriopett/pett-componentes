import { default as default_2 } from 'react';
import { HTMLInputTypeAttribute } from 'react';

declare type KeyFilterType = "int" | "num" | "hex" | "alfa" | "alfanum" | RegExp;

export declare const PettButton: default_2.FC<PettButtonProps>;

export declare interface PettButtonProps {
    animado?: boolean;
    caption?: string;
    children?: default_2.ReactNode;
    className?: string;
    click?: (e: default_2.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    condicional?: boolean;
    disabled?: boolean;
    drop?: boolean;
    icone?: string;
    link?: string;
    onClick?: (e: default_2.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    responsivo?: "true" | "false" | boolean;
    icoSize?: number | string;
    size?: PettButtonSize;
    style?: default_2.CSSProperties;
    type?: "button" | "submit" | "reset";
    variant?: PettButtonVariant;
}

export declare type PettButtonSize = "md" | "sm" | "lg";

export declare type PettButtonVariant = "dark" | "light" | "red" | "green" | "blue" | "orange" | "yellow" | "purple";

export declare const PettColorSwatch: default_2.FC<PettColorSwatchProps>;

export declare interface PettColorSwatchProps {
    className?: string;
    color?: string;
    disabled?: boolean;
    editable?: boolean;
    format?: "square" | "circle";
    name?: string;
    onChange?: (colorHex: string) => void;
    onClick?: (e: default_2.MouseEvent<HTMLDivElement>) => void;
    readOnly?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: number;
    style?: default_2.CSSProperties;
    value?: string;
}

/**
 * PettColumn não renderiza nada sozinho — ele é lido pelo PettGrid via
 * `React.Children` para montar a tabela. Existe só para dar uma API
 * declarativa (`<PettGrid><PettColumn .../><PettColumn .../></PettGrid>`),
 * do mesmo jeito que o Column do PrimeReact funcionava.
 */
export declare const PettColumn: default_2.FC<PettColumnProps>;

export declare interface PettColumnBodyOptions {
    rowIndex: number;
}

export declare interface PettColumnProps {
    /** Nome da propriedade lida em cada linha de `listagem` (ex: "nome"). */
    field?: string;
    /** Texto ou conteúdo do cabeçalho da coluna. */
    header?: default_2.ReactNode;
    /** Renderização customizada da célula. Recebe a linha inteira e o índice. */
    body?: (rowData: any, options: PettColumnBodyOptions) => default_2.ReactNode;
    /** Largura inicial da coluna (px). Pode ser redimensionada depois pelo usuário. */
    width?: number;
    /** Estilo aplicado a cada célula do corpo desta coluna. */
    style?: default_2.CSSProperties;
    /** Estilo aplicado ao cabeçalho desta coluna. */
    headerStyle?: default_2.CSSProperties;
    /** Alinhamento do conteúdo (atalho para text-align). */
    align?: "left" | "center" | "right";
    /** Desativa o redimensionamento apenas desta coluna (o grid continua redimensionável nas outras). */
    resizable?: boolean;
    /** Permite ordenar a listagem clicando no cabeçalho desta coluna (usa `field`). */
    sortable?: boolean;
}

export declare const PettFieldCheck: default_2.NamedExoticComponent<PettFieldCheckProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettFieldCheckProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    labelClass?: string;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: default_2.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: boolean;
}

export declare const PettFieldColor: default_2.NamedExoticComponent<PettFieldColorProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettFieldColorProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onChange?: (colorHex: string) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: string;
}

export declare const PettFieldDate: default_2.NamedExoticComponent<PettFieldDateProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettFieldDateProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    max?: string;
    min?: string;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: string;
}

export declare const PettFieldDrop: default_2.NamedExoticComponent<PettFieldDropProps & default_2.RefAttributes<HTMLSelectElement>>;

export declare interface PettFieldDropOption {
    label?: string;
    value?: any;
    [key: string]: any;
}

export declare interface PettFieldDropProps {
    disabled?: boolean;
    label?: string;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLSelectElement>) => void;
    options: (PettFieldDropOption | string | number)[];
    optionLabel?: string;
    optionValue?: string;
    readOnly?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: string | number;
}

export declare const PettFieldFloat: default_2.NamedExoticComponent<PettFieldFloatProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettFieldFloatProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    maxDigits?: number;
    minDigits?: number;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: number | string;
}

export declare const PettFieldLoc: default_2.NamedExoticComponent<PettFieldLocProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettFieldLocProps {
    carregando?: boolean;
    disabled?: boolean;
    label?: string;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onClick?: (e: default_2.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: string | number | null;
}

export declare const PettFieldMask: default_2.NamedExoticComponent<PettFieldMaskProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettFieldMaskProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    mask: string;
    name: string;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    upper?: boolean;
    value?: string;
}

export declare const PettFieldMoney: default_2.NamedExoticComponent<PettFieldMoneyProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettFieldMoneyProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: number | string;
}

export declare const PettFieldOtp: default_2.NamedExoticComponent<PettFieldOtpProps & default_2.RefAttributes<PettFieldOtpHandle>>;

export declare interface PettFieldOtpHandle {
    /** Foca o primeiro dígito do código. */
    focus: () => void;
}

export declare interface PettFieldOtpProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    integerOnly?: boolean;
    label?: string;
    length?: number;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    style?: default_2.CSSProperties;
    upper?: boolean;
    value?: string;
}

export declare const PettFieldPass: default_2.NamedExoticComponent<PettFieldPassProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettFieldPassProps {
    autoComplete?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    feedback?: boolean;
    inputClass?: string;
    label?: string;
    maxLength?: number;
    mediumLabel?: string;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    promptLabel?: string;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    strongLabel?: string;
    toggleMask?: boolean;
    value?: string;
    weakLabel?: string;
}

export declare const PettFieldSearch: default_2.NamedExoticComponent<PettFieldSearchProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettFieldSearchProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    length?: number;
    name: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    onChange?: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    setMap?: (e: any) => void;
    size?: string;
    upper?: boolean;
    value?: string | number;
}

export declare const PettFieldText: default_2.NamedExoticComponent<PettFieldTextProps & default_2.RefAttributes<HTMLInputElement>>;

export declare const PettFieldTextArea: default_2.NamedExoticComponent<PettFieldTextAreaProps & default_2.RefAttributes<HTMLTextAreaElement>>;

export declare interface PettFieldTextAreaProps {
    autoResize?: boolean;
    disabled?: boolean;
    font?: string;
    label?: string;
    maxLength?: number;
    name: string;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLTextAreaElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    rows?: number | string;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    upper?: boolean;
    value?: string;
}

export declare interface PettFieldTextProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    keyfilter?: KeyFilterType;
    label?: string;
    length?: number;
    name: string;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    type?: HTMLInputTypeAttribute;
    upper?: boolean;
    value?: string | number;
}

export declare const PettGrid: default_2.FC<PettGridProps>;

export declare interface PettGridProps {
    className?: string;
    children?: default_2.ReactNode;
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

export declare const PettIcon: default_2.FC<PettIconProps>;

export declare interface PettIconProps {
    animado?: boolean;
    className?: string;
    name: string;
    size?: number | string;
    style?: default_2.CSSProperties;
}

export declare const PettModal: default_2.FC<PettModalProps> & {
    Footer: default_2.FC<{
        children?: default_2.ReactNode;
    }>;
};

/** Marca o conteúdo que deve ir pro rodapé do modal, em vez do corpo.
 * Uso: <PettModal><PettModalFooter><PettButton .../></PettModalFooter></PettModal>
 * (também disponível como PettModal.Footer). */
export declare const PettModalFooter: default_2.FC<{
    children?: default_2.ReactNode;
}>;

export declare type PettModalPosition = "center" | "top";

export declare interface PettModalProps {
    /** Controla se o modal está visível. Quando false, nada é renderizado. */
    show: boolean;
    /** Chamado ao fechar (clique no X, no botão "Fechar", Esc ou clique no fundo). */
    onHide?: () => void;
    title?: default_2.ReactNode;
    children?: default_2.ReactNode;
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

export declare type PettModalSize = "sm" | "md" | "lg";

export declare const PettSwitch: default_2.NamedExoticComponent<PettSwitchProps & default_2.RefAttributes<HTMLInputElement>>;

export declare interface PettSwitchProps {
    autoFocus?: boolean;
    checked?: boolean | string;
    disabled?: boolean;
    falseValue?: any;
    inputClass?: string;
    label?: string;
    labelClass?: string;
    name?: string;
    onBlur?: (e: default_2.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: {
        value: any;
        originalEvent: default_2.ChangeEvent<HTMLInputElement>;
    }) => void;
    onKeyDown?: (e: default_2.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: default_2.Dispatch<default_2.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    trueValue?: any;
    value?: any;
}

export declare const PettTab: default_2.FC<PettTabProps>;

/**
 * PettTabPanel não renderiza nada sozinho — é lido pelo PettTab via
 * `React.Children` para montar as abas, do mesmo jeito que o PettColumn
 * é lido pelo PettGrid.
 */
export declare const PettTabPanel: default_2.FC<PettTabPanelProps>;

export declare interface PettTabPanelProps {
    /** Texto (ou conteúdo) mostrado na aba. */
    header: default_2.ReactNode;
    children?: default_2.ReactNode;
    /** Desativa essa aba especificamente (não pode ser clicada/focada). */
    disabled?: boolean;
    /** Classe extra aplicada ao container do conteúdo desta aba. */
    className?: string;
}

export declare interface PettTabProps {
    children?: default_2.ReactNode;
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

export { }
