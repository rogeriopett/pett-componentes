import React, { useCallback } from "react";
import "./PettFieldCheck.css";

export interface PettFieldCheckProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    labelClass?: string;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: boolean;
}

export const PettFieldCheck: React.FC<PettFieldCheckProps> = React.memo((props) => {
    const {
        autoFocus,
        disabled = false,
        inputClass = "",
        label,
        labelClass = "",
        name,
        onBlur,
        onChange,
        onKeyDown,
        readOnly = false,
        required = false,
        set,
        setMap,
        size = "",
        value = false,
    } = props;

    const handleValueChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (readOnly || disabled) return;

            const checked = e.target.checked;

            if (onChange) {
                onChange(e);
            }

            if (setMap) {
                setMap({ ...e, target: { ...e.target, name, value: checked } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: checked }));
            }
        },
        [set, setMap, onChange, name, readOnly, disabled]
    );

    const isChecked = Boolean(value);

    return (
        <div className={`pett-field-container pett-check-container ${size}`.trim()}>
            <label
                htmlFor={name}
                className={`pett-check-wrapper ${disabled ? "pett-check-disabled" : ""} ${readOnly ? "pett-check-readonly" : ""}`.trim()}
            >
                <input
                    id={name}
                    name={name}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleValueChange}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    autoFocus={autoFocus}
                    className={`pett-check-input ${inputClass}`.trim()}
                />
                <span className="pett-check-box">
                    <svg
                        className="pett-check-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </span>
                {label && <span className={`pett-check-label ${labelClass}`.trim()}>{label}</span>}
            </label>
        </div>
    );
});

PettFieldCheck.displayName = "PettFieldCheck";