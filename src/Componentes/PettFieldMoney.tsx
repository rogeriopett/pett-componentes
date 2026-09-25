import React, { useCallback } from "react";
import "./PettFieldMoney.css";

export interface PettFieldMoneyProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
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

// Formata um valor numérico ou string de dígitos para a moeda BRL (ex: "R$ 1.234,56")
const formatToBRL = (val?: number | string): string => {
    if (val === undefined || val === null || val === "") return "";

    let numericValue: number;

    if (typeof val === "number") {
        numericValue = val;
    } else {
        // Se receber uma string com centavos em texto, extrai os dígitos
        const cleanDigits = val.replace(/\D/g, "");
        if (!cleanDigits) return "";
        numericValue = parseFloat(cleanDigits) / 100;
    }

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericValue);
};

// Converte a string digitada para o valor numérico de retorno
const parseDigitsToNumber = (rawValue: string): number | null => {
    const cleanDigits = rawValue.replace(/\D/g, "");
    if (!cleanDigits) return null;
    return parseFloat(cleanDigits) / 100;
};

export const PettFieldMoney = React.memo(React.forwardRef<HTMLInputElement, PettFieldMoneyProps>((props, ref) => {
    const {
        autoFocus,
        disabled = false,
        inputClass = "",
        label,
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
            const numericValue = parseDigitsToNumber(rawInput);

            // Atualização do estado com o valor numérico limpo (ex: 1234.56)
            if (setMap) {
                setMap({ ...e, target: { ...e.target, name, value: numericValue } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: numericValue }));
            }
        },
        [set, setMap, name]
    );

    const formattedValue = formatToBRL(value);

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-float-label">
                <input
                    id={name}
                    name={name}
                    type="text"
                    ref={ref}
                    inputMode="numeric"
                    value={formattedValue}
                    onChange={handleValueChange}
                    onBlur={onBlur}
                    readOnly={readOnly}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    required={required}
                    autoFocus={autoFocus}
                    className={`pett-input pett-input-money ${inputClass}`.trim()}
                />
                {label && <label htmlFor={name}>{label}</label>}
            </div>
        </div>
    );
}));

PettFieldMoney.displayName = "PettFieldMoney";