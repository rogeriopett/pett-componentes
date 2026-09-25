import React from "react";
import { PettIcon } from "./PettIcon";
import "./PettButton.css";

export type PettButtonVariant =
    | "dark"
    | "light"
    | "red"
    | "green"
    | "blue"
    | "orange"
    | "yellow"
    | "purple";

export type PettButtonSize = "md" | "sm" | "lg";

export interface PettButtonProps {
    animado?: boolean;
    caption?: string;
    children?: React.ReactNode;
    className?: string;
    click?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    condicional?: boolean;
    disabled?: boolean;
    drop?: boolean;
    icone?: string;
    link?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    responsivo?: "true" | "false" | boolean;
    icoSize?: number | string;
    size?: PettButtonSize;
    style?: React.CSSProperties;
    type?: "button" | "submit" | "reset";
    variant?: PettButtonVariant;
}

export const PettButton: React.FC<PettButtonProps> = React.memo((props) => {
    const {
        animado = false,
        caption,
        children,
        className = "",
        click,
        condicional = true,
        disabled = false,
        drop = false,
        icone,
        link = "",
        onClick,
        responsivo = "true",
        icoSize = "16",
        size = "md",
        style,
        type = "button",
        variant = "light",
    } = props;

    if (!condicional) return null;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        if (onClick) onClick(e);
        if (click) click(e);
    };

    const isResponsivo = responsivo === "true" || responsivo === true;

    const classes = [
        "btn-pett",
        `btn-pett-${variant}`,
        `btn-pett-${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const buttonContent = (
        <>
            {icone && <PettIcon name={icone} size={icoSize} animado={animado} />}
            {(caption || children) && (
                <span className={isResponsivo ? "pett-btn-text-responsive" : "pett-btn-text"}>
                    {caption ?? children}
                </span>
            )}
            {drop && <PettIcon name="chevron_down" size={size === "lg" ? "12" : size === "sm" ? "8" : "9"}/>}
        </>
    );

    const commonProps = {
        className: classes,
        disabled,
        onClick: handleClick,
        style,
        title: typeof caption === "string" ? caption : undefined,
    };

    if (link) {
        return (
            <a href={link} {...commonProps}>
                {buttonContent}
            </a>
        );
    }

    return (
        <button type={type} {...commonProps}>
            {buttonContent}
        </button>
    );
});

PettButton.displayName = "PettButton";