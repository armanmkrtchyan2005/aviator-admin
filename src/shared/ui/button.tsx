import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/tailwind-merge";

export const buttonVariants = cva(
    "min-w-24 select-none shadow-md px-3 py-1.5 focus-visible:outline-blue-300 outline-2 outline-offset-2 font-semibold rounded-lg shadow-md transition-all duration-150 enabled:active:scale-95 disabled:opacity-50 text-center",
    {
        variants: {
            variant: {
                default: "",
                primary: "bg-blue-500 text-white enabled:hover:bg-blue-600",
                danger: "bg-red-500 text-white enabled:hover:bg-red-600",
                success: "bg-lime-500 text-white enabled:hover:bg-lime-600",
                outline: "",
                secondary: ""
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
);

interface ButtonProps
    extends React.ComponentPropsWithRef<"button">,
        VariantProps<typeof buttonVariants> {}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant,
    ...props
}) => {
    return (
        <button
            className={cn(buttonVariants({ variant, className }))}
            {...props}
        />
    );
};
