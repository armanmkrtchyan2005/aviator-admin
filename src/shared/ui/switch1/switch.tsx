import "./switch.css";

export const Switch = () => {
    return (
        <button className="switch">
            <svg
                className="thumb"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 15"
                fill="none"
            >
                <defs>
                    <linearGradient id="Gradient1">
                        <stop
                            className="stop1"
                            offset="0%"
                        />
                        <stop
                            className="stop2"
                            offset="100%"
                        />
                    </linearGradient>
                    <filter
                        id="inset-shadow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                    >
                        <feComponentTransfer in="SourceAlpha">
                            <feFuncA
                                type="table"
                                tableValues="1 0"
                            />
                        </feComponentTransfer>
                        <feGaussianBlur stdDeviation="3" />
                        <feOffset
                            dx="3"
                            dy="5"
                            result="offsetblur"
                        />
                        <feFlood
                            floodColor="black"
                            result="color"
                        />
                        <feComposite
                            in2="offsetblur"
                            operator="in"
                        />
                        <feComposite
                            in2="SourceAlpha"
                            operator="in"
                        />
                        <feMerge>
                            <feMergeNode in="SourceGraphic" />
                            <feMergeNode />
                        </feMerge>
                    </filter>
                </defs>
                <rect
                    x="1.25"
                    y="0"
                    ry="7.5"
                    alignmentBaseline="central"
                    // filter="url(#inset-shadow)"
                />
                <g>
                    <circle
                        cx="9"
                        // cx="32.5"
                        cy="7.5"
                        r="9"
                    />
                    <text
                        x="9"
                        y="8.25"
                        height="10"
                        fontSize="6px"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="black"
                    >
                        OFF
                    </text>
                </g>
            </svg>
        </button>
    );
};
