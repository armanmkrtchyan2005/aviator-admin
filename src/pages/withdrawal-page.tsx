import { Outlet } from "react-router-dom";
import { PageHeader } from "@/widgets/page-header";
import { TableFooter } from "@/widgets/table-footer";
import { WithdrawalTableWidget } from "@/widgets/withdrawal/table";
import { WithdrawalCategoryFilterWidget } from "@/widgets/withdrawal/category-filter";
import { GlobalFilter } from "@/features/user/filtrate";
import {
    TableLayoutWithSidebar,
    TableProvider,
    TableSidebar
} from "@/shared/ui/table";
import { Tabs } from "@/widgets/tabs";
import { WithdrawalTimeLapsSelector } from "@/features/withdrawal/select-time-laps";
import { WithdrawalCounter } from "@/features/withdrawal/count";

export const WithdrawalPage = () => {
    return (
        <>
            <article className="rounded-xl bg-slate-200 px-3 py-6 text-black">
                <TableProvider>
                    <PageHeader>Выберите заявку на вывод</PageHeader>

                    <TableLayoutWithSidebar>
                        <Tabs />
                        <header className="flex flex-wrap items-center gap-4 rounded-lg bg-white px-3 py-2">
                            <GlobalFilter />

                            <WithdrawalCounter />
                            <WithdrawalTimeLapsSelector />
                        </header>

                        <WithdrawalTableWidget />

                        <TableSidebar className="row-start-2 row-end-4">
                            <WithdrawalCategoryFilterWidget />
                        </TableSidebar>

                        <TableFooter className="col-start-1 col-end-3" />
                    </TableLayoutWithSidebar>
                </TableProvider>
            </article>

            <Outlet />
        </>
    );
};
