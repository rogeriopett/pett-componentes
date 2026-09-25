import React, { useCallback, useRef } from "react";
import "./PettFieldMask.css";

export interface PettFieldMaskProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    mask: string; // Ex: "999.999.999-99", "(99) 99999-9999", "aaaa-9999"
    name: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    upper?: boolean;
    value?: string;
}

// Valida se o caractere inserido bate com o tipo esperado pelo curinga da máscara
const isValidForMaskChar = (char: string, maskChar: string): boolean => {
    if (maskChar === "9") return /\d/.test(char);
    if (maskChar === "a" || maskChar === "A") return /[a-zA-Z]/.test(char);
    if (maskChar === "*") return /[a-zA-Z0-9]/.test(char);
    return false;
};

// Aplica a máscara validando cada caractere e convertendo para upper se necessário
const applyMask = (rawValue: string = "", maskPattern: string, upper: boolean = false): string => {
    if (!rawValue) return "";

    let maskedResult = "";
    let rawIndex = 0;

    for (let i = 0; i < maskPattern.length && rawIndex < rawValue.length; i++) {
        const maskChar = maskPattern[i];

        if (maskChar === "9" || maskChar === "a" || maskChar === "A" || maskChar === "*") {
            while (rawIndex < rawValue.length) {
                let currentChar = rawValue[rawIndex];
                rawIndex++;

                if (isValidForMaskChar(currentChar, maskChar)) {
                    if (upper) {
                        currentChar = currentChar.toUpperCase();
                    }
                    maskedResult += currentChar;
                    break;
                }
            }
        } else {
            // Caractere fixo de pontuação (ex: '(', ')', ' ', '.', '-', '/')
            maskedResult += maskChar;
            if (rawValue[rawIndex] === maskChar) {
                rawIndex++;
            }
        }
    }

    return maskedResult;
};

// Verifica se o caractere em determinado índice da máscara é um curinga digitável
const isSlotChar = (maskPattern: string, index: number): boolean => {
    if (index < 0 || index >= maskPattern.length) return false;
    const c = maskPattern[index];
    return c === "9" || c === "a" || c === "A" || c === "*";
};

export const PettFieldMask: React.FC<PettFieldMaskProps> = React.memo((props) => {
    const {
        autoFocus,
        disabled = false,
        inputClass = "",
        label,
        mask,
        name,
        onKeyDown,
        readOnly = false,
        required = false,
        set,
        setMap,
        size = "",
        upper = false,
        value = "",
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleValueChange = useCallback( (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputEl = e.target;
        let rawInput = inputEl.value;

        if (upper) {
            rawInput = rawInput.toUpperCase();
        }

        // Formata e descarta qualquer caractere inválido
        const maskedValue = applyMask(rawInput, mask, upper);

        if (setMap) {
            setMap({ ...e, target: { ...e.target, name, value: maskedValue } });
        } else if (set) {
            set((prev: any) => ({ ...prev, [name]: maskedValue }));
        }

        let targetPos = inputEl.selectionStart ?? maskedValue.length;

        // Avança o cursor sobre caracteres fixos de pontuação
        if (maskedValue.length > 0) {
            while (targetPos < maskedValue.length && !isSlotChar(mask, targetPos - 1)) {
                targetPos++;
            }
        }

        setTimeout(() => {
            if (inputRef.current) {
                const finalPos = Math.min(targetPos, maskedValue.length);
                inputRef.current.setSelectionRange(finalPos, finalPos);
            }
        }, 0);
    }, [set, setMap, mask, name, upper] );

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-float-label">
                <input
                    ref={inputRef}
                    id={name}
                    name={name}
                    type="text"
                    value={value ?? ""}
                    onChange={handleValueChange}
                    readOnly={readOnly}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    required={required}
                    autoFocus={autoFocus}
                    maxLength={mask.length}
                    className={`pett-input-mask ${inputClass}`.trim()}
                />
                {label && <label htmlFor={name}>{label}</label>}
            </div>
        </div>
    );
});

PettFieldMask.displayName = "PettFieldMask";