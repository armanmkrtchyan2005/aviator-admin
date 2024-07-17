import { useEffect } from "react";

import { useTableContext } from "@/shared/ui/table/use-table-context";

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

import { Table } from "@/shared/ui/table/table";
import { Replenishment } from "../api";

interface ReplenishmentsTableProps {
    data: Replenishment[];
    columns: ColumnDef<Replenishment>[];
}

export const ReplenishmentsTable: React.FC<ReplenishmentsTableProps> = ({
    data,
    columns
}) => {
    const {
        setTable,
        columnFilters,
        setColumnFilters,
        globalFilter,
        setGlobalFilter,
        pagination,
        setPagination
    } = useTableContext();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter,
            columnFilters,
            pagination
        },
        enableColumnFilters: true,
        enableFilters: true,
        enableGlobalFilter: true,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination
    });

    useEffect(() => {
        setTable(table);
    }, [table, setTable]);

    return <Table />;
};
