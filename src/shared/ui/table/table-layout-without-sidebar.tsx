import { cn } from "@/shared/lib/tailwind-merge";

interface TableLayoutWithoutSidebarProps
    extends React.ComponentProps<"section"> {}

export const TableLayoutWithoutSidebar: React.FC<
    TableLayoutWithoutSidebarProps
> = ({ className, ...props }) => {
    return (
        <section
            className={cn("mt-6 grid gap-y-4 rounded-lg", className)}
            {...props}
        />
    );
};
