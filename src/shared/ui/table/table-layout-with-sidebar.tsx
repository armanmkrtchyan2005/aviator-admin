import { cn } from "@/shared/lib/tailwind-merge";

interface TableLayoutWithSidebarProps extends React.ComponentProps<"section"> {}

export const TableLayoutWithSidebar: React.FC<TableLayoutWithSidebarProps> = ({
    className,
    ...props
}) => {
    return (
        <section
            className={cn(
                "mt-6 grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-4",
                className
            )}
            {...props}
        />
    );
};
