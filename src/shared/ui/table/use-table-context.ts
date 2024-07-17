import {
    Table,
    ColumnFiltersState,
    PaginationState
} from "@tanstack/react-table";
import { createContext, useContext } from "react";

export const TableContext = createContext<{
    table: Table<any> | null;
    setTable: React.Dispatch<React.SetStateAction<Table<any> | null>>;
    columnFilters: ColumnFiltersState;
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
    globalFilter: string;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
    pagination: PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
} | null>(null);

export const useTableContext = () => {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error(
            "Component must be rendered as child of table component"
        );
    }

    return context;
};
