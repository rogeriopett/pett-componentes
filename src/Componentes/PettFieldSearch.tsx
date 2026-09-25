import React, { useCallback, useRef } from "react";
import { PettIcon } from "./PettIcon";
import "./PettFieldSearch.css";

export interface PettFieldSearchProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    length?: number;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    set?: React.Dispatch<React.SetStateAction<any>>;
    onChange?: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    setMap?: (e: any) => void;
    size?: string;
    upper?: boolean;
    value?: string | number;
}

export const PettFieldSearch: React.FC<PettFieldSearchProps> = React.memo((props) => {
    const {
        autoFocus,
        disabled = false,
        inputClass = "",
        label,
        length,
        name,
        onBlur,
        onChange,
        onKeyDown,
        placeholder = "Pesquisar...",
        readOnly = false,
        set,
        setMap,
        size = "",
        upper = false,
        value = "",
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const stringValue = String(value ?? "");

    const updateValue = useCallback(
        (newValue: string) => {
            let valor = newValue;
            if (upper) {
                valor = valor.toUpperCase();
            }

            if (onChange) {
                onChange(valor);
            }

            if (setMap) {
                setMap({ target: { name, value: valor } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: valor }));
            }
        },
        [name, set, setMap, onChange, upper]
    );

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateValue(e.target.value);
    };

    const handleClear = () => {
        if (disabled || readOnly) return;
        updateValue("");
        inputRef.current?.focus();
    };

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-search-wrapper">
                <span className="pett-search-icon-left">
                    <PettIcon name="search" size="14" />
                </span>

                <input
                    ref={inputRef}
                    id={name}
                    name={name}
                    type="text"
                    value={stringValue}
                    onChange={handleValueChange}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    maxLength={length}
                    readOnly={readOnly}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    placeholder={label ? undefined : placeholder}
                    className={`pett-search-input ${inputClass}`.trim()}
                />

                {label && <label htmlFor={name}>{label}</label>}

                {stringValue.length > 0 && !disabled && !readOnly && (
                    <button
                        type="button"
                        className="pett-search-clear-btn"
                        onClick={handleClear}
                        title="Limpar pesquisa"
                        tabIndex={-1}
                    >
                        {/* <PettIcon name="blind" size="10" /> */}
                    </button>
                )}
            </div>
        </div>
    );
});

PettFieldSearch.displayName = "PettFieldSearch";