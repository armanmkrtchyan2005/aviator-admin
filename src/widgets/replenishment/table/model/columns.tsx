import { ColumnDef } from "@tanstack/react-table";

import { Replenishment } from "@/entities/replenishment/api";
import { Currency } from "@/entities/requisite/api";
import { formatDate, formatTime } from "@/shared/lib";

import { ReplenishmentActionButton } from "@/features/replenishment/action";
import { PreviewControl } from "@/features/replenishment/preview/ui/preview-control";

export const columns = (
    currency: Currency | undefined,
    bonus: number | undefined
): ColumnDef<Replenishment>[] => {
    return [
        {
            id: "id",
            header: "ID заявки",
            accessorFn: row => `#${row.uid}`
        },
        {
            id: "amount",
            header: currency ? `Сумма, ${currency}` : "Сумма",
            footer: props => props.column.id,
            accessorFn: row =>
                currency ? row.deduction[currency].toFixed(2) : ""
        },
        {
            id: "debit",
            header: "Сумма списания, USDT",
            footer: props => props.column.id,
            accessorFn: row =>
                ((row.amount["USDT"] * (100 - (bonus || 0))) / 100).toFixed(2)
        },
        {
            id: "status",
            header: "Статус",
            accessorKey: "status"
        },
        {
            id: "reason",
            header: "Причина отмены",
            accessorKey: "statusMessage"
        },
        {
            id: "requisite",
            header: "Реквизиты",
            footer: props => props.column.id,
            accessorFn: row => `*${row?.requisite?.requisite?.slice(-4)}`
        },
        {
            id: "date",
            header: "Дата",
            accessorFn: row =>
                `Создано: ${formatDate(
                    row.createdAt
                )} ${formatTime(row.createdAt, "%H:%M:%S")}
            ${
                row.completedDate
                    ? `Выполнено: ${formatDate(
                          row.completedDate
                      )} ${formatTime(row.completedDate, "%H:%M:%S")}`
                    : ""
            }`
        },
        {
            id: "actions",
            header: "Действия",
            footer: props => props.column.id,

            cell: cell => {
                if (
                    cell.row.original.status.toLowerCase() === "отменена" ||
                    cell.row.original.status.toLowerCase() ===
                        "успешно завершена"
                ) {
                    return null;
                }
                return (
                    <ReplenishmentActionButton
                        replenishmentId={cell.row.original._id}
                    />
                );
            }
        },
        {
            id: "verification",
            header: "Верификация",
            cell: cell => (
                <PreviewControl
                    replenishmentId={cell.row.original._id}
                    cardEnabled={!!cell.row.original.card}
                    receiptEnabled={!!cell.row.original.receipt}
                />
            )
        }
    ];
};
