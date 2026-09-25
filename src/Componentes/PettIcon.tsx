import React from "react";
import "./PettIcon.css";

export interface PettIconProps {
    animado?: boolean;
    className?: string;
    name: string;
    size?: number | string;
    style?: React.CSSProperties;
}

// Carrega estaticamente os caminhos das imagens SVGs no bundle do Vite
// const iconUrls = import.meta.glob<{ default: string }>("../Imagens/Icones/*.svg", {
const iconUrls = import.meta.glob<string>("../Imagens/Icones/*.svg", {
    eager: true,
    import: "default",
});


export const PettIcon: React.FC<PettIconProps> = React.memo((props) => {
    const { animado = false, className = "", name, size = "16", style } = props;

    const iconPath = `../Imagens/Icones/${name}.svg`;
    const src = iconUrls[iconPath];

    if (!src) {
        console.warn(`Ícone não encontrado: ${name} no caminho ${iconPath}`);
        return null;
    }

    const classeAnimacao = animado ? "ico-animado" : "";
    const dimension = typeof size === "number" ? `${size}px` : size;

    return (
        <img
            src={src}
            alt={name}
            width={dimension}
            height={dimension}
            className={`pett-icon ico-${size} ${classeAnimacao} ${className}`.trim()}
            style={{
                display: "inline-block",
                verticalAlign: "middle",
                width: dimension,
                height: dimension,
                ...style,
            }}
        />
    );
});

PettIcon.displayName = "PettIcon";