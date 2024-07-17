import { PageHeader } from "@/widgets/page-header";

import { BalanceTableWidget } from "@/widgets/balance/table";
import { TableFooter } from "@/widgets/table-footer";

import { TableProvider, TableLayoutWithoutSidebar } from "@/shared/ui/table";

export const BalancePage = () => {
    return (
        <article className="rounded-xl bg-slate-200 px-3 py-6 text-black">
            <PageHeader>История пополнения баланса</PageHeader>

            <TableProvider>
                <TableLayoutWithoutSidebar>
                    <BalanceTableWidget />

                    <TableFooter />
                </TableLayoutWithoutSidebar>
            </TableProvider>
        </article>
    );
};
