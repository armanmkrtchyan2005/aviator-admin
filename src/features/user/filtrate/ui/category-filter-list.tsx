import { useRef } from "react";

import { useTableContext } from "@/shared/ui/table/use-table-context";

import { CategoryFilterItem } from "./category-filter-item";

export interface Category {
    value: string;
    label: string;
    amount: number;
}
interface CategoryFilterListProps extends React.ComponentProps<"ul"> {
    categories: Category[];
}
export const CategoryFilterList: React.FC<CategoryFilterListProps> = ({
    categories,
    ...props
}) => {
    const { table } = useTableContext();
    const currentCategoryIndex = useRef(0);

    const onClickHandler = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        value: string,
        index: number
    ) => {
        if (!table) return;

        const filterElementsList = event.currentTarget.parentElement?.children;

        if (!filterElementsList) return;

        filterElementsList[currentCategoryIndex.current].setAttribute(
            "aria-selected",
            "false"
        );
        event.currentTarget.setAttribute("aria-selected", "true");
        currentCategoryIndex.current = index;

        const columns = table.getAllColumns();
        const actions = columns.filter(column => column.id === "status")[0];
        actions.setFilterValue(value);
    };

    return (
        <ul
            role="listbox"
            {...props}
        >
            {categories.map((category, i) => (
                <CategoryFilterItem
                    key={category.value}
                    onClick={event => onClickHandler(event, category.value, i)}
                    aria-selected={currentCategoryIndex.current === i}
                >
                    {`${category.label} (${category.amount})`}
                </CategoryFilterItem>
            ))}
        </ul>
    );
};
