import { useState, useMemo } from "react";
import {
    Table,
    ColumnFiltersState,
    PaginationState
} from "@tanstack/react-table";
import { TableContext } from "./use-table-context";

interface TableProviderProps {
    children: React.ReactNode;
}

export const TableProvider: React.FC<TableProviderProps> = ({ children }) => {
    const [table, setTable] = useState<Table<any> | null>(null);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });

    const memoizedValue = useMemo(() => {
        return {
            table,
            setTable,
            columnFilters,
            setColumnFilters,
            globalFilter,
            setGlobalFilter,
            pagination,
            setPagination
        };
    }, [table, columnFilters, globalFilter, pagination]);

    return (
        <TableContext.Provider value={memoizedValue}>
            {children}
        </TableContext.Provider>
    );
};
