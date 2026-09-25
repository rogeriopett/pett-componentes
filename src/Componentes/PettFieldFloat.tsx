import React, { useCallback } from "react";
import "./PettFieldFloat.css";

export interface PettFieldFloatProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    maxDigits?: number;
    minDigits?: number;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: number | string;
}

// Formata o valor numérico para exibição sem símbolo de moeda e com decimais configurados
const formatFloat = (
    val?: number | string,
    minDigits: number = 2,
    maxDigits: number = 2
): string => {
    if (val === undefined || val === null || val === "") return "";

    let numericValue: number;

    if (typeof val === "number") {
        numericValue = val;
    } else {
        const cleanDigits = val.replace(/\D/g, "");
        if (!cleanDigits) return "";
        numericValue = parseFloat(cleanDigits) / Math.pow(10, maxDigits);
    }

    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: minDigits,
        maximumFractionDigits: maxDigits,
        useGrouping: false, // Sem separador de milhar, conforme useGrouping={false} do original
    }).format(numericValue);
};

// Extrai o número real baseado nas casas decimais configuradas
const parseDigitsToFloat = (rawValue: string, maxDigits: number = 2): number | null => {
    const cleanDigits = rawValue.replace(/\D/g, "");
    if (!cleanDigits) return null;
    return parseFloat(cleanDigits) / Math.pow(10, maxDigits);
};

export const PettFieldFloat = React.memo(React.forwardRef<HTMLInputElement, PettFieldFloatProps>((props, ref) => {
    const {
        autoFocus,
        disabled = false,
        inputClass = "",
        label,
        maxDigits = 2,
        minDigits = 2,
        name,
        onBlur,
        onKeyDown,
        readOnly = false,
        required = false,
        set,
        setMap,
        size = "",
        value = "",
    } = props;

    const handleValueChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const rawInput = e.target.value || "";
            const numericValue = parseDigitsToFloat(rawInput, maxDigits);

            if (setMap) {
                setMap({ ...e, target: { ...e.target, name, value: numericValue } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: numericValue }));
            }
        },
        [set, setMap, name, maxDigits]
    );

    const formattedValue = formatFloat(value, minDigits, maxDigits);

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-float-label">
                <input
                    id={name}
                    name={name}
                    type="text"
                    ref={ref}
                    inputMode="decimal"
                    value={formattedValue}
                    onChange={handleValueChange}
                    onBlur={onBlur}
                    readOnly={readOnly}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    required={required}
                    autoFocus={autoFocus}
                    className={`pett-input pett-input-float ${inputClass}`.trim()}
                />
                {label && <label htmlFor={name}>{label}</label>}
            </div>
        </div>
    );
}));

PettFieldFloat.displayName = "PettFieldFloat";