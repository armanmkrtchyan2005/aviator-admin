import "./switch.css";

interface SwitchProps
    extends Omit<React.ComponentProps<"button">, "children"> {}

export const Switch: React.FC<SwitchProps> = ({ className, ...props }) => {
    return (
        <button
            role="switch"
            aria-checked={props?.["aria-checked"] || false}
            className={`switch ${className}`}
            {...props}
        >
            <div className="checkbox">
                <div className="thumb"></div>
            </div>
        </button>
    );
};
