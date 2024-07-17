import { useTableContext } from "./use-table-context";

export const RowsPerPageSelector = () => {
    const { table } = useTableContext();

    const onChangeHandler: React.ChangeEventHandler<
        HTMLSelectElement
    > = event => {
        if (!table) return;

        table.setPageSize(Number(event.target.value));
    };

    return (
        <div>
            <span className="text-lg font-medium">Записей на странице:</span>{" "}
            <select
                defaultValue="10"
                onChange={onChangeHandler}
                className="rounded border-2 border-neutral-400 bg-white px-2 py-1 focus-visible:border-blue-500 focus-visible:outline-neutral-500"
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
            </select>
        </div>
    );
};
