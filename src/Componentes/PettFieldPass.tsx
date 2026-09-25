import React, { useCallback, useState } from "react";
import "./PettFieldPass.css";

export interface PettFieldPassProps {
    autoComplete?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    feedback?: boolean;
    inputClass?: string;
    label?: string;
    maxLength?: number;
    mediumLabel?: string;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    promptLabel?: string;
    readOnly?: boolean;
    required?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    strongLabel?: string;
    toggleMask?: boolean;
    value?: string;
    weakLabel?: string;
}

const getPasswordStrength = (pass: string = ""): number => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
};

export const PettFieldPass = React.memo(React.forwardRef<HTMLInputElement, PettFieldPassProps>((props, ref) => {
    const {
        autoComplete = "new-password",
        autoFocus,
        disabled = false,
        feedback = false,
        inputClass = "",
        label,
        maxLength,
        mediumLabel = "Dificuldade média!",
        name,
        onBlur,
        onKeyDown,
        promptLabel = "Digite uma Senha.",
        readOnly = false,
        required = false,
        set,
        setMap,
        size = "",
        strongLabel = "Boa senha!",
        toggleMask = true,
        value = "",
        weakLabel = "Muito simples!",
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleValueChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value: valor } = e.target;

            if (setMap) {
                setMap({ ...e, target: { ...e.target, name, value: valor } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: valor }));
            }
        },
        [set, setMap]
    );

    const toggleVisibility = useCallback(() => {
        if (!disabled && !readOnly) {
            setShowPassword((prev) => !prev);
        }
    }, [disabled, readOnly]);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
        },
        [onBlur]
    );

    const stringValue = String(value ?? "");
    const strength = getPasswordStrength(stringValue);

    let strengthLabel = promptLabel;
    let strengthColor = "#ccc";

    if (stringValue.length > 0) {
        if (strength <= 25) {
            strengthLabel = weakLabel;
            strengthColor = "#f44336";
        } else if (strength <= 75) {
            strengthLabel = mediumLabel;
            strengthColor = "#ff9800";
        } else {
            strengthLabel = strongLabel;
            strengthColor = "#4caf50";
        }
    }

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-float-label pett-pass-wrapper">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    ref={ref}
                    value={stringValue}
                    onChange={handleValueChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={maxLength}
                    readOnly={readOnly}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    required={required}
                    autoComplete={autoComplete}
                    autoFocus={autoFocus}
                    className={`pett-input ${toggleMask ? "pett-input-pass" : ""} ${inputClass}`.trim()}
                />
                {label && <label htmlFor={name}>{label}</label>}

                {toggleMask && (
                    <span className="pett-pass-icon-btn" onClick={toggleVisibility}>
                        {showPassword ? (
                            /* Olho Fechado com cor escura */
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                        ) : (
                            /* Olho Aberto com cor escura */
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </span>
                )}

                {feedback && isFocused && (
                    <div className="pett-pass-feedback-popover">
                        <div className="pett-pass-meter">
                            <div className="pett-pass-meter-fill" style={{ width: `${strength}%`, backgroundColor: strengthColor }} />
                        </div>
                        <span className="pett-pass-feedback-label">{strengthLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
}));

PettFieldPass.displayName = "PettFieldPass";