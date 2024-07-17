import { useEffect } from "react";

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

import { Table, useTableContext } from "@/shared/ui/table";
import { Requisite } from "..";

interface RequisitesTableProps {
    data: Requisite[];
    columns: ColumnDef<Requisite>[];
}

export const RequisitesTable: React.FC<RequisitesTableProps> = ({
    data,
    columns
}) => {
    const {
        setTable,
        columnFilters,
        setColumnFilters,
        globalFilter,
        setGlobalFilter,
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
            columnFilters
        },
        enableColumnFilters: true,
        enableFilters: true,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination
    });

    useEffect(() => {
        setTable(table);
    }, [table, setTable]);

    return <Table />;
};
