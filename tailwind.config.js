/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                "fade-in": {
                    from: {
                        opacity: 0.5,
                        transform: "scale(0.8) translate(-50%, -50%)"
                    },
                    to: {
                        opacity: 1,
                        transform: "scale(1) translate(-50%, -50%)"
                    }
                }
            },
            animation: {
                "fade-in": "fade-in 1s linear"
            }
        }
    },
    plugins: []
};
