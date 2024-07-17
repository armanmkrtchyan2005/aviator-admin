import {
    PageNavigator,
    Pagination,
    RowsPerPageSelector
} from "@/shared/ui/table";

import { cn } from "@/shared/lib/tailwind-merge";

interface TableFooterProps extends React.ComponentProps<"footer"> {}

export const TableFooter: React.FC<TableFooterProps> = ({
    className,
    ...props
}) => {
    return (
        <footer
            className={cn("grid grid-cols-3 items-center px-3", className)}
            {...props}
        >
            <RowsPerPageSelector />
            <Pagination />
            <PageNavigator />
        </footer>
    );
};
