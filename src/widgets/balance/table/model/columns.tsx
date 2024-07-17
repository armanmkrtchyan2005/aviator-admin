import { ColumnDef } from "@tanstack/react-table";
import { Deposit } from "@/entities/balance";
import { formatDate, formatTime } from "@/shared/lib";

export const columns: ColumnDef<Deposit>[] = [
    {
        id: "date",
        header: "Дата",
        accessorFn: row =>
            `${formatDate(
                row.createdAt
            )} ${formatTime(row.createdAt, "%H:%M:%S")}`
    },
    {
        id: "amount",
        header: "Сумма пополнения",
        accessorKey: "balance"
    }
    // {
    //     id: "link",
    //     header: "Ссылка на транзакцию",
    //     accessorKey: "link"
    // }
];
