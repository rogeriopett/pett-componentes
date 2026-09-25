import React, { useCallback } from "react";
import { PettButton } from "./PettButton";
import "./PettFieldLoc.css";

export interface PettFieldLocProps {
    carregando?: boolean;
    disabled?: boolean;
    label?: string;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: string | number | null;
}

export const PettFieldLoc = React.memo(React.forwardRef<HTMLInputElement, PettFieldLocProps>((props, ref) => {
    const {
        carregando = false,
        disabled = false,
        label,
        name,
        onBlur,
        onClick,
        onKeyDown,
        readOnly = false,
        set,
        setMap,
        size = "",
        value = "",
    } = props;

    const stringValue = value !== null && value !== undefined ? String(value) : "";

    const handleValueChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const valor = e.target.value.replace(/\D/g, "");

            if (setMap) {
                setMap({ ...e, target: { ...e.target, name, value: valor } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: valor }));
            }
        },
        [set, setMap, name]
    );

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-loc-group">
                <div className="pett-float-label pett-loc-input-wrapper">
                    <input
                        id={name}
                        name={name}
                        type="text"
                        ref={ref}
                        inputMode="numeric"
                        value={stringValue}
                        onChange={handleValueChange}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        readOnly={readOnly}
                        disabled={disabled}
                        className="pett-loc-input"
                    />
                    {label && <label htmlFor={name}>{label}</label>}
                </div>

                <PettButton
                    icone={carregando ? "loading_green" : "search"}
                    animado={carregando}
                    disabled={disabled || carregando}
                    onClick={onClick}
                    className="pett-loc-btn"
                    icoSize="25"
                />
            </div>
        </div>
    );
}));

PettFieldLoc.displayName = "PettFieldLoc";
