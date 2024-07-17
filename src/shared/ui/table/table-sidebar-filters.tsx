import { cn } from "@/shared/lib/tailwind-merge";

interface TableSidebarProps extends React.ComponentProps<"aside"> {}

export const TableSidebar: React.FC<TableSidebarProps> = ({
    className,
    ...props
}) => {
    return (
        <aside
            className={cn(
                "col-start-2 col-end-3 row-start-1 row-end-3 min-w-56",
                className
            )}
            {...props}
        />
    );
};
