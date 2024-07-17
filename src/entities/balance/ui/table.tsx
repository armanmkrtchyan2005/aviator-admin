import { useEffect } from "react";

import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

import { Table, useTableContext } from "@/shared/ui/table";
import { Deposit } from "../api";

interface BalanceTableProps {
    data: Deposit[];
    columns: ColumnDef<Deposit>[];
}

export const BalanceTable: React.FC<BalanceTableProps> = ({
    data,
    columns
}) => {
    const { setTable } = useTableContext();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableColumnFilters: true,
        enableFilters: true
    });

    useEffect(() => {
        setTable(table);
    }, [table, setTable]);

    return <Table className="w-full table-fixed" />;
};
