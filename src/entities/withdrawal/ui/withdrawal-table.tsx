import { useEffect } from "react";
import { useFetchUserInfoQuery } from "@/entities/user";

import { useTableContext } from "@/shared/ui/table/use-table-context";

import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

import { Table } from "@/shared/ui/table/table";
import { Withdrawal } from "..";
interface ReplenishmentsTableProps {
    data: Withdrawal[];
    columns: ColumnDef<Withdrawal>[];
}

export const WithdrawalTable: React.FC<ReplenishmentsTableProps> = ({
    data,
    columns
}) => {
    const { data: user } = useFetchUserInfoQuery();
    const {
        setTable,
        columnFilters,
        globalFilter,
        setGlobalFilter,
        setColumnFilters,
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
            pagination: pagination
        },
        enableColumnFilters: true,
        enableFilters: true,
        enableGlobalFilter: true,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination
    });

    useEffect(() => {
        const columns = table.getAllColumns();
        const actions = columns.filter(column => column.id === "action")[0];
        actions.setFilterValue({
            type: "available",
            id: user?._id
        });
    }, [user?._id]);

    useEffect(() => {
        setTable(table);
    }, [table, setTable, setPagination]);

    return <Table />;
};
