import React, { useCallback, useRef } from "react";
import "./PettFieldTextArea.css";

export interface PettFieldTextAreaProps {
    autoResize?: boolean;
    disabled?: boolean;
    font?: string;
    label?: string;
    maxLength?: number;
    name: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    rows?: number | string;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    upper?: boolean;
    value?: string;
}

export const PettFieldTextArea: React.FC<PettFieldTextAreaProps> = React.memo((props) => {
    const {
        autoResize = true,
        disabled = false,
        font = "",
        label,
        maxLength,
        name,
        onKeyDown,
        readOnly = false,
        required = false,
        rows = 6,
        set,
        setMap,
        size = "",
        upper = false,
        value = "",
    } = props;

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleValueChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target;
        const cursorPosition = target.selectionStart; // 1. Guarda a posição exata do cursor
        const { name, value } = target;

        let valor = value || "";
        if (upper) {
            valor = valor.toUpperCase();
        }

        // 2. Atualiza o estado
        if (setMap) {
            setMap({ ...e, target: { ...e.target, name, value: valor } });
        } else if (set) {
            set((prev: any) => ({ ...prev, [name]: valor }));
        }

        // 3. Redimensiona a altura se autoResize for true e restaura o cursor
        requestAnimationFrame(() => {
            if (autoResize && textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            }

            // Restaura a posição exata do cursor após a alteração no DOM
            if (target && cursorPosition !== null) {
                target.setSelectionRange(cursorPosition, cursorPosition);
            }
        });
    }, [set, setMap, upper, autoResize] );

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-float-label">
                <textarea
                    ref={textareaRef}
                    id={name}
                    name={name}
                    value={value ?? ""}
                    onChange={handleValueChange}
                    rows={Number(rows)}
                    maxLength={maxLength}
                    readOnly={readOnly}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    required={required}
                    className={`pett-textarea ${font}`.trim()}
                />
                {label && <label htmlFor={name}>{label}</label>}
            </div>
        </div>
    );
});

PettFieldTextArea.displayName = "PettFieldTextArea";