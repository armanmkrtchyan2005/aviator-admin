import { useId, useMemo } from "react";
import { cn } from "@/shared/lib/tailwind-merge";
import { Replenishment } from "@/entities/replenishment";
import { Withdrawal } from "@/entities/withdrawal";

import { CategoryFilterList } from "./category-filter-list";

interface CategoryFilterProps extends React.ComponentProps<"div"> {
    data: (Replenishment | Withdrawal)[];
}

const categories = [
    { value: "", label: "Все" },
    { value: "Ожидает оплаты", label: "Активные" },
    { value: "Отменена", label: "Отменённые" },
    { value: "Успешно", label: "Успешно выполненные" }
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
    data,
    className,
    ...props
}) => {
    const labelId = useId();

    const memoizedData = useMemo(() => {
        return categories.map(category => {
            if (category.value === "")
                return { ...category, amount: data.length };

            const amount = data.filter(
                item =>
                    item.status.toLowerCase() ===
                    category.value.toLocaleLowerCase()
            ).length;

            return { ...category, amount: amount };
        });
    }, [data]);

    return (
        <div
            className={cn("sticky top-4 rounded-lg bg-white p-2", className)}
            {...props}
        >
            <h3
                id={labelId}
                className="text-center text-lg font-medium"
            >
                Статусы
            </h3>
            <CategoryFilterList
                aria-labelledby={labelId}
                categories={memoizedData}
            />
        </div>
    );
};
