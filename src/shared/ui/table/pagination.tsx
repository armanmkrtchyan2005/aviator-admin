import { useReducer } from "react";
import { useTableContext } from "./use-table-context";

import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";

export const Pagination = () => {
    const [_, rerender] = useReducer(() => ({}), {});
    const { table } = useTableContext();

    const [hasPreviousPage, hasNextPage] = [
        table?.getCanPreviousPage(),
        table?.getCanNextPage()
    ];

    const goToTheFirstPage: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (!table) return;
        table.setPageIndex(0);
        rerender();
    };

    const goToThePreviousPage: React.MouseEventHandler<
        HTMLButtonElement
    > = () => {
        if (!table) return;
        table.previousPage();
        rerender();
    };

    const goToTheNextPage: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (!table) return;
        table.nextPage();
        rerender();
    };

    const goToTheLastPage: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (!table) return;
        table.setPageIndex(table.getPageCount() - 1);
        rerender();
    };

    return (
        <div className="self-center justify-self-center text-xl">
            <button
                title="Первая страница"
                disabled={!hasPreviousPage}
                onClick={goToTheFirstPage}
                className="aspect-square w-10 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-300 disabled:pointer-events-none disabled:text-neutral-400"
            >
                <MdKeyboardDoubleArrowLeft className="m-auto block" />
                <span className="sr-only">Первая страница</span>
            </button>
            <button
                title="Предыдущая страница"
                disabled={!hasPreviousPage}
                onClick={goToThePreviousPage}
                className="aspect-square w-10 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-300 disabled:pointer-events-none disabled:text-neutral-400"
            >
                <MdKeyboardArrowLeft className="m-auto block" />
                <span className="sr-only">Предыдущая страница</span>
            </button>
            <button
                title="Следующая страница"
                disabled={!hasNextPage}
                onClick={goToTheNextPage}
                className="aspect-square w-10 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-300 disabled:pointer-events-none disabled:text-neutral-400"
            >
                <MdKeyboardArrowRight className="m-auto block" />
                <span className="sr-only">Следующая страница</span>
            </button>
            <button
                title="Последняя страница"
                disabled={!hasNextPage}
                onClick={goToTheLastPage}
                className="aspect-square w-10 rounded-full bg-white hover:bg-neutral-100 active:bg-neutral-300 disabled:pointer-events-none disabled:text-neutral-400"
            >
                <MdKeyboardDoubleArrowRight className="m-auto block" />
                <span className="sr-only">Последняя страница</span>
            </button>
        </div>
    );
};
