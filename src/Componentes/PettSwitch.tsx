import React, { useCallback } from "react";
import "./PettSwitch.css";

export interface PettSwitchProps {
    autoFocus?: boolean;
    checked?: boolean | string;
    disabled?: boolean;
    falseValue?: any;
    inputClass?: string;
    label?: string;
    labelClass?: string;
    name?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: { value: any; originalEvent: React.ChangeEvent<HTMLInputElement> }) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    trueValue?: any;
    value?: any;
}

export const PettSwitch = React.memo(React.forwardRef<HTMLInputElement, PettSwitchProps>((props, ref) => {
    const {
        autoFocus,
        checked,
        disabled = false,
        falseValue = "N",
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
        trueValue = "S",
        value,
    } = props;

    // Considera checked, value ou o valor real do estado se name estiver presente
    const currentValue = checked !== undefined ? checked : value;
    const isChecked = currentValue === trueValue || currentValue === true;

    const handleToggle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (readOnly || disabled) return;

            const nextChecked = e.target.checked;
            const nextValue = nextChecked ? trueValue : falseValue;

            // 1. Atualização via callback onChange
            if (onChange) {
                onChange({ value: nextValue, originalEvent: e });
            }

            // 2. Atualização automática do estado (padrão name + set)
            if (name) {
                if (setMap) {
                    setMap({ ...e, target: { ...e.target, name, value: nextValue } });
                } else if (set) {
                    set((prev: any) => ({ ...prev, [name]: nextValue }));
                }
            }
        },
        [readOnly, disabled, trueValue, falseValue, onChange, name, setMap, set]
    );

    return (
        <div className={`pett-field-container pett-switch-container ${size}`.trim()}>
            <label
                className={`pett-switch-wrapper ${disabled ? "pett-switch-disabled" : ""} ${readOnly ? "pett-switch-readonly" : ""}`.trim()}
            >
                <input
                    id={name}
                    name={name}
                    type="checkbox"
                    ref={ref}
                    checked={isChecked}
                    onChange={handleToggle}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    autoFocus={autoFocus}
                    className={`pett-switch-input ${inputClass}`.trim()}
                />
                <span className="pett-switch-slider">
                    <span className="pett-switch-handle" />
                </span>
                {label && <span className={`pett-switch-label ${labelClass}`.trim()}>{label}</span>}
            </label>
        </div>
    );
}));

PettSwitch.displayName = "PettSwitch";