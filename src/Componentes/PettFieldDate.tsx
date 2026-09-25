import React, { useCallback, useRef } from "react";
import { PettButton } from "./PettButton";
import "./PettFieldDate.css";

export interface PettFieldDateProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    max?: string;
    min?: string;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: string;
}

const formatDateToBr = (isoDate: string = ""): string => {
    if (!isoDate) return "";
    if (isoDate.includes("/")) return isoDate;
    const parts = isoDate.split("-");
    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoDate;
};

const formatDateToIso = (brDate: string = ""): string => {
    if (!brDate) return "";
    if (brDate.includes("-")) return brDate;
    const parts = brDate.split("/");
    if (parts.length === 3 && parts[2].length === 4) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return brDate;
};

const applyDateMask = (rawValue: string = ""): string => {
    const digits = rawValue.replace(/\D/g, "").slice(0, 8);
    let formatted = "";

    if (digits.length > 0) {
        formatted += digits.slice(0, 2);
    }
    if (digits.length >= 3) {
        formatted += "/" + digits.slice(2, 4);
    }
    if (digits.length >= 5) {
        formatted += "/" + digits.slice(4, 8);
    }

    return formatted;
};

export const PettFieldDate = React.memo(React.forwardRef<HTMLInputElement, PettFieldDateProps>((props, ref) => {
    const {
        autoFocus,
        disabled = false,
        inputClass = "",
        label,
        max,
        min,
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

    const hiddenPickerRef = useRef<HTMLInputElement | null>(null);

    const displayValue = formatDateToBr(value);

    const handleTextChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const masked = applyDateMask(e.target.value);
            const isoValue = formatDateToIso(masked);

            if (setMap) {
                setMap({ ...e, target: { ...e.target, name, value: isoValue } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: isoValue }));
            }
        },
        [set, setMap, name]
    );

    const handlePickerChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const isoValue = e.target.value;

            if (setMap) {
                setMap({ ...e, target: { ...e.target, name, value: isoValue } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: isoValue }));
            }
        },
        [set, setMap, name]
    );

    const handleIconClick = useCallback(() => {
        const inputEl = hiddenPickerRef.current;
        if (inputEl) {
            if ("showPicker" in inputEl) {
                (inputEl as HTMLInputElement).showPicker();
            } else {
                (inputEl as HTMLInputElement).focus();
            }
        }
    }, []);

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-float-label pett-date-wrapper">
                <input
                    id={name}
                    name={name}
                    type="text"
                    ref={ref}
                    value={displayValue}
                    onChange={handleTextChange}
                    onBlur={onBlur}
                    readOnly={readOnly}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    required={required}
                    autoFocus={autoFocus}
                    maxLength={10}
                    placeholder="DD/MM/AAAA"
                    className={`pett-input-date ${inputClass}`.trim()}
                />
                {label && <label htmlFor={name}>{label}</label>}

                {/* Input Date invisível ancorado na ponta esquerda */}
                <input
                    ref={hiddenPickerRef}
                    type="date"
                    min={min}
                    max={max || "9999-12-31"}
                    value={formatDateToIso(value)}
                    onChange={handlePickerChange}
                    tabIndex={-1}
                    className="pett-hidden-date-picker"
                />

                <PettButton
                    icone="calendar"
                    icoSize="25"
                    onClick={handleIconClick}
                    disabled={disabled || readOnly}
                    className="pett-date-icon-btn"
                />
            </div>
        </div>
    );
}));

PettFieldDate.displayName = "PettFieldDate";