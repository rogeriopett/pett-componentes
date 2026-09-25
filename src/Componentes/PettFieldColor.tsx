import React, { useState, useRef, useEffect, useCallback } from "react";
import "./PettFieldColor.css";

export interface PettFieldColorProps {
    autoFocus?: boolean;
    disabled?: boolean;
    inputClass?: string;
    label?: string;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (colorHex: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    required?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: string;
}

interface HSV {
    h: number;
    s: number;
    v: number;
}

// Converte HEX para HSV
const hexToHsv = (hex: string): HSV => {
    let c = (hex || "#000000").replace("#", "");
    if (c.length === 3) c = c.split("").map((x) => x + x).join("");
    const num = parseInt(c, 16);
    if (isNaN(num)) return { h: 0, s: 100, v: 100 };

    const r = ((num >> 16) & 255) / 255;
    const g = ((num >> 8) & 255) / 255;
    const b = (num & 255) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;

    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100),
    };
};

// Converte HSV para HEX
const hsvToHex = (h: number, s: number, v: number): string => {
    s /= 100;
    v /= 100;
    const i = Math.floor((h / 60) % 6);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r = 0,
        g = 0,
        b = 0;
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }

    const toHex = (x: number) =>
        Math.round(x * 255)
            .toString(16)
            .padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

export const PettFieldColor: React.FC<PettFieldColorProps> = React.memo((props) => {
    const {
        autoFocus,
        disabled = false,
        inputClass = "",
        label,
        name,
        onBlur,
        onChange,
        onKeyDown,
        readOnly = false,
        required = false,
        set,
        setMap,
        size = "",
        value = "#FBE111",
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [hsv, setHsv] = useState<HSV>(() => hexToHsv(value));
    const [hexInput, setHexInput] = useState(value);

    const containerRef = useRef<HTMLDivElement>(null);
    const satValRef = useRef<HTMLDivElement>(null);
    const hueBarRef = useRef<HTMLDivElement>(null);

    const isDraggingSat = useRef(false);
    const isDraggingHue = useRef(false);

    useEffect(() => {
        setHexInput(value);
        setHsv(hexToHsv(value));
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const notifyChange = useCallback(
        (newHex: string) => {
            if (onChange) onChange(newHex);

            if (setMap) {
                setMap({ target: { name, value: newHex } });
            } else if (set) {
                set((prev: any) => ({ ...prev, [name]: newHex }));
            }
        },
        [onChange, setMap, set, name]
    );

    const updateSatVal = useCallback(
        (e: MouseEvent) => {
            if (!satValRef.current) return;
            const rect = satValRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
            const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

            const s = Math.round((x / rect.width) * 100);
            const v = Math.round((1 - y / rect.height) * 100);

            setHsv((prev) => {
                const newHsv = { ...prev, s, v };
                const newHex = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
                setHexInput(newHex);
                notifyChange(newHex);
                return newHsv;
            });
        },
        [notifyChange]
    );

    const updateHue = useCallback(
        (e: MouseEvent) => {
            if (!hueBarRef.current) return;
            const rect = hueBarRef.current.getBoundingClientRect();
            const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

            const h = Math.round((y / rect.height) * 360);

            setHsv((prev) => {
                const newHsv = { ...prev, h };
                const newHex = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
                setHexInput(newHex);
                notifyChange(newHex);
                return newHsv;
            });
        },
        [notifyChange]
    );

    const handleSatMouseDown = (e: React.MouseEvent) => {
        if (disabled || readOnly) return;
        isDraggingSat.current = true;
        updateSatVal(e.nativeEvent);
    };

    const handleHueMouseDown = (e: React.MouseEvent) => {
        if (disabled || readOnly) return;
        isDraggingHue.current = true;
        updateHue(e.nativeEvent);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDraggingSat.current) updateSatVal(e);
            if (isDraggingHue.current) updateHue(e);
        };
        const handleMouseUp = () => {
            isDraggingSat.current = false;
            isDraggingHue.current = false;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [updateSatVal, updateHue]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setHexInput(val);
        if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
            setHsv(hexToHsv(val));
            notifyChange(val);
        }
    };

    return (
        <div className={`pett-field-container ${size}`.trim()} ref={containerRef}>
            <div className="pett-float-label pett-color-picker-wrapper">
                <div className="pett-color-picker-input-group">
                    <input
                        id={name}
                        name={name}
                        type="text"
                        value={value}
                        onChange={handleTextChange}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        readOnly={readOnly}
                        disabled={disabled}
                        required={required}
                        autoFocus={autoFocus}
                        maxLength={7}
                        className={`pett-input ${inputClass}`.trim()}
                    />
                    {label && <label htmlFor={name}>{label}</label>}

                    <button
                        type="button"
                        disabled={disabled || readOnly}
                        onClick={() => setIsOpen(!isOpen)}
                        title="Escolher cor"
                        className="pett-color-swatch-btn"
                        style={{ backgroundColor: value }}
                    />
                </div>

                {isOpen && (
                    <div className="pett-color-popover">
                        <div className="pett-color-canvas-row">
                            <div
                                ref={satValRef}
                                onMouseDown={handleSatMouseDown}
                                className="pett-color-satval-box"
                                style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
                            >
                                <div
                                    className="pett-color-satval-pointer"
                                    style={{
                                        left: `${hsv.s}%`,
                                        top: `${100 - hsv.v}%`,
                                    }}
                                />
                            </div>

                            <div ref={hueBarRef} onMouseDown={handleHueMouseDown} className="pett-color-hue-bar">
                                <div
                                    className="pett-color-hue-pointer"
                                    style={{ top: `${(hsv.h / 360) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="pett-color-hex-row">
                            <span className="pett-color-hex-label">HEX</span>
                            <input
                                type="text"
                                value={hexInput}
                                onChange={handleTextChange}
                                maxLength={7}
                                className="pett-color-hex-input"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

PettFieldColor.displayName = "PettFieldColor";