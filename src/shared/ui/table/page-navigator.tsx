import { useRef } from "react";
import { useTableContext } from "./use-table-context";

export const PageNavigator = () => {
    const { table } = useTableContext();

    const currentPage = table ? table.getState().pagination.pageIndex + 1 : 0;
    const totalPages = table ? table.getPageCount() : 0;

    const validPage = useRef(currentPage);

    const goToPage: React.ChangeEventHandler<HTMLInputElement> = event => {
        if (!table) return;

        const input = event.currentTarget;
        const selectionStart = (input.selectionStart || 0) - 1;
        const selectionEnd = (input.selectionEnd || 0) - 1;

        if (input.value === "" || input.value === "0") {
            input.value = "";
            validPage.current = 0;
            table.setPageIndex(0);
            return;
        }

        if (!/^[1-9][0-9]*$/.test(input.value)) {
            input.value = String(validPage.current + 1);
            input.setSelectionRange(selectionStart + 1, selectionEnd + 1);
            return;
        }

        const page = input.value ? Number(input.value) - 1 : 0;

        if (page >= totalPages) {
            input.value = String(totalPages);
            input.setSelectionRange(selectionStart + 1, selectionEnd + 1);
            validPage.current = totalPages - 1;
            table.setPageIndex(totalPages - 1);
            return;
        }

        validPage.current = page;
        table.setPageIndex(page);
    };

    return (
        <div className="flex items-center justify-self-end text-balance text-lg">
            <span className="flex items-center gap-1">
                <span>Страница</span>
                <strong>
                    {currentPage} из {totalPages}
                </strong>
                &nbsp;
            </span>
            <span className="flex items-center gap-1">
                | Перейти на страницу:
                <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    min={1}
                    max={totalPages}
                    disabled={!table}
                    onChange={goToPage}
                    className="w-16 rounded-md border-2 border-solid border-neutral-400 bg-white bg-clip-padding px-2 py-1 font-normal text-neutral-700 transition duration-200 ease-in-out focus-visible:border-blue-500 focus-visible:text-neutral-700 focus-visible:outline-neutral-500"
                />
            </span>
        </div>
    );
};
