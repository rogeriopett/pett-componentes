import React, { useCallback } from "react";
import "./PettFieldDrop.css";

export interface PettFieldDropOption {
    label?: string;
    value?: any;
    [key: string]: any;
}

export interface PettFieldDropProps {
    disabled?: boolean;
    label?: string;
    name: string;
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    options: (PettFieldDropOption | string | number)[];
    optionLabel?: string;
    optionValue?: string;
    readOnly?: boolean;
    set?: React.Dispatch<React.SetStateAction<any>>;
    setMap?: (e: any) => void;
    size?: string;
    value?: string | number;
}

export const PettFieldDrop = React.memo(React.forwardRef<HTMLSelectElement, PettFieldDropProps>((props, ref) => {
    const {
        disabled = false,
        label,
        name,
        onBlur,
        options = [],
        optionLabel,
        optionValue,
        readOnly = false,
        set,
        setMap,
        size = "",
        value = "",
    } = props;

    const handleValueChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const valor = e.target.value || "";

        if (setMap) {
            setMap({ ...e, target: { ...e.target, name, value: valor } });
        } else if (set) {
            set((prev: any) => ({ ...prev, [name]: valor }));
        }
    }, [set, setMap, name]);

    // Auxiliar para extrair Label e Value das options (sejam objetos ou valores primitivos)
    const getOptionData = (opt: PettFieldDropOption | string | number) => {
        if (typeof opt === "object" && opt !== null) {
            const optLabel = optionLabel ? opt[optionLabel] : opt.label ?? opt.value;
            const optVal = optionValue ? opt[optionValue] : opt.value ?? opt.label;
            return { label: optLabel, value: optVal };
        }
        return { label: opt, value: opt };
    };

    return (
        <div className={`pett-field-container ${size}`.trim()}>
            <div className="pett-float-label">
                <select
                    id={name}
                    name={name}
                    ref={ref}
                    value={value ?? ""}
                    onChange={handleValueChange}
                    onBlur={onBlur}
                    disabled={disabled || readOnly}
                    className="pett-select"
                >
                    {/* Opção vazia para quando nenhum valor estiver selecionado */}
                    <option value="" disabled hidden />
          
                    {options.map((opt, index) => {
                        const { label: itemLabel, value: itemVal } = getOptionData(opt);
                        return (
                        <option key={index} value={itemVal}>
                            {itemLabel}
                        </option>
                        );
                    })}
                </select>
                {label && <label htmlFor={name}>{label}</label>}
            </div>
        </div>
    );
}));

PettFieldDrop.displayName = "PettFieldDrop";