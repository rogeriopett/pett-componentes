import React, { useCallback, useImperativeHandle, useRef, useId } from "react";
import "./PettFieldOtp.css";

export interface PettFieldOtpProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    integerOnly?: boolean;
    label?: string;
    length?: number;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    style?: React.CSSProperties;
    upper?: boolean;
    value?: string;
}

export interface PettFieldOtpHandle {
    /** Foca o primeiro dígito do código. */
    focus: () => void;
}

export const PettFieldOtp = React.memo(React.forwardRef<PettFieldOtpHandle, PettFieldOtpProps>((props, ref) => {
    const {
        autoFocus = false,
        disabled = false,
        inputClass = "",
        integerOnly = true,
        label,
        length = 6,
        name,
        onBlur,
        readOnly = false,
        set,
        setMap,
        size = "col-12",
        style = { fontSize: "21px" },
        upper = true,
        value = "",
    } = props;

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const containerId = useId();

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRefs.current[0]?.focus();
        },
    }), []);

    const stringValue = String(value ?? "");

    const updateState = useCallback(
        (newValue: string) => {
            let finalValue = newValue;
            if (upper) {
                finalValue = finalValue.toUpperCase();
            }

            if (setMap) {
                setMap({ target: { name, value: finalValue } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: finalValue }));
            }
        },
        [set, setMap, name, upper]
    );

    const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled || readOnly) return;

        let char = e.target.value.slice(-1); // Pega apenas o último caractere digitado

        if (integerOnly && char && !/^\d$/.test(char)) {
            return;
        }

        if (upper) {
            char = char.toUpperCase();
        }

        const valueArray = stringValue.split("");
        valueArray[index] = char;
        const newValue = valueArray.join("").slice(0, length);

        updateState(newValue);

        // Avança o foco para o próximo campo
        if (char && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled || readOnly) return;

        if (e.key === "Backspace") {
            const valueArray = stringValue.split("");

            if (valueArray[index]) {
                // Limpa a posição atual
                valueArray[index] = "";
                updateState(valueArray.join(""));
            } else if (index > 0) {
                // Se a posição atual já estava vazia, limpa o anterior e recua o foco
                valueArray[index - 1] = "";
                updateState(valueArray.join(""));
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        if (disabled || readOnly) return;

        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        let filtered = pastedData;
        if (integerOnly) {
            filtered = filtered.replace(/\D/g, "");
        }
        if (upper) {
            filtered = filtered.toUpperCase();
        }

        const newValue = filtered.slice(0, length);
        updateState(newValue);

        // Define o foco para o último caractere colado ou o próximo campo disponível
        const nextIndex = Math.min(newValue.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
    };

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            {label && <label className="pett-otp-label" htmlFor={`${containerId}-input-0`}>{label}</label>}
            <div className={`pett-field-otp-container ${inputClass}`.trim()} onPaste={handlePaste}>
                {Array.from({ length }).map((_, index) => {
                    const char = stringValue[index] || "";

                    return (
                        <input
                            key={index}
                            id={`${containerId}-input-${index}`}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode={integerOnly ? "numeric" : "text"}
                            maxLength={1}
                            value={char}
                            onChange={(e) => handleInputChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onBlur={onBlur}
                            disabled={disabled}
                            readOnly={readOnly}
                            autoFocus={autoFocus && index === 0}
                            className="pett-otp-input"
                            style={style}
                        />
                    );
                })}
            </div>
        </div>
    );
}));

PettFieldOtp.displayName = "PettFieldOtp";