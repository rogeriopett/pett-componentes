import React, { useCallback } from "react";
import type { HTMLInputTypeAttribute } from "react";
import "./PettFieldText.css";

export type KeyFilterType = "int" | "num" | "hex" | "alfa" | "alfanum" | RegExp;

export interface PettFieldTextProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    keyfilter?: KeyFilterType;
    label?: string;
    length?: number;
    name: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    type?: HTMLInputTypeAttribute;
    upper?: boolean;
    value?: string | number;
}

// Retorna a regra de validação para o keyfilter informado
const getKeyFilterRegex = (filter?: KeyFilterType): RegExp | null => {
    if (!filter) return null;
    if (filter instanceof RegExp) return filter;

    switch (filter) {
        case "int":
            return /^-?\d*$/; // Apenas números inteiros
        case "num":
            return /^-?\d*[.,]?\d*$/; // Números com decimais
        case "hex":
            return /^[0-9a-fA-F]*$/; // Hexadecimal
        case "alfa":
            return /^[a-zA-Z\u00C0-\u00FF\s]*$/; // Apenas letras, acentos e espaços
        case "alfanum":
            return /^[a-zA-Z0-9\u00C0-\u00FF\s]*$/; // Letras, números e espaços
        default:
            return null;
    }
};

export const PettFieldText = React.memo(React.forwardRef<HTMLInputElement, PettFieldTextProps>((props, ref) => {
    const {
        autoFocus,
        disabled = false,
        inputClass = "",
        keyfilter,
        label,
        length,
        name,
        onKeyDown,
        readOnly = false,
        required = false,
        set,
        setMap,
        size = "",
        type = "text",
        upper = true,
        value = "",
    } = props;

    const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const cursorPosition = e.target.selectionStart;

        let valor = value || '';

        // --- VALIDAÇÃO DO KEYFILTER ---
        const regex = getKeyFilterRegex(keyfilter);
        if (regex && valor !== '') {
            if (!regex.test(valor)) {
                return; // Impede a digitação caso o caractere não seja permitido
            }
        }

        if (upper && type === 'text') {
            valor = valor.toUpperCase();
        }

        // --- LÓGICA DE ATUALIZAÇÃO ---
        if (setMap) {
            setMap({ ...e, target: { ...e.target, name, value: valor } });
        } else if (set) {
            set((prev: any) => ({ ...prev, [name]: valor }));
        }

        // --- MANUTENÇÃO DO CURSOR ---
        if (cursorPosition !== null && type === 'text') {
            setTimeout(() => {
                e.target.setSelectionRange(cursorPosition, cursorPosition);
            }, 0);
        }
    }, [set, setMap, upper, type, keyfilter]);

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-float-label">
                <input
                    id={name}
                    name={name}
                    type={type}
                    ref={ref}
                    value={value ?? ''}
                    onChange={handleValueChange}
                    maxLength={length}
                    readOnly={readOnly}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    required={required}
                    autoFocus={autoFocus}
                    className={`pett-input ${inputClass}`.trim()}
                />
                {label && <label htmlFor={name}>{label}</label>}
            </div>
        </div>
    );
}));

PettFieldText.displayName = "PettFieldText";