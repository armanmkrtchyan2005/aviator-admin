import { ColumnDef, FilterFn } from "@tanstack/react-table";

import { WithdrawalActionButton } from "@/features/withdrawal/action";
import { Withdrawal, Currency } from "@/entities/withdrawal";

import { formatDate, formatTime } from "@/shared/lib";

const actionFilterFunction: FilterFn<Withdrawal> = (
    row,
    columnId,
    filterValue
) => {
    const { type, id } = filterValue;

    switch (type) {
        case "available":
            return (
                row.original.active !== id &&
                row.original.status.toLowerCase() === "ожидает оплаты"
            );

        case "active":
            return (
                row.original.active === id &&
                row.original.status.toLowerCase() === "ожидает оплаты"
            );

        case "all":
        default:
            return true;
    }
};

actionFilterFunction.autoRemove = value => {
    return value.id === undefined;
};

export const columns = (
    currency: Currency | undefined,
    bonus: number | undefined
): ColumnDef<Withdrawal>[] => {
    return [
        {
            id: "id",
            header: "ID заявки",
            accessorFn: row => `#${row.uid}`
        },
        {
            id: "amount",
            header: currency ? `Сумма, ${currency}` : "Сумма",
            accessorFn: row =>
                currency ? row.amount?.[currency].toFixed(2) : ""
        },
        {
            id: "income",
            header: "Вы получите, USDT",
            accessorFn: row =>
                ((row.amount["USDT"] * (100 + (bonus || 0))) / 100).toFixed(2)
        },
        {
            id: "requisite",
            header: "Реквизиты",
            accessorKey: "userRequisite"
        },
        {
            id: "status",
            header: "Статус",
            accessorKey: "status"
        },
        {
            id: "status_message",
            header: "Причина",
            accessorKey: "statusMessage"
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
            id: "action",
            header: "Действия",
            cell: cell => {
                if (
                    cell.row.original.status.toLowerCase() === "отменена" ||
                    cell.row.original.status.toLowerCase() === "успешно"
                )
                    return null;

                return (
                    <WithdrawalActionButton
                        withdrawalId={cell.row.original._id}
                        activeUserId={cell.row.original.active}
                    />
                );
            },
            filterFn: actionFilterFunction
        }
    ];
};
