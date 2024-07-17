import { PageHeader } from "@/widgets/page-header";
import { AddRequisiteButton } from "@/features/requisite/add";
import { RequisiteTableWidget } from "@/widgets/requisite/table";
import { TableProvider, TableLayoutWithoutSidebar } from "@/shared/ui/table";
import { TableFooter } from "@/widgets/table-footer";

export const RequisitePage = () => {
    return (
        <article className="rounded-xl bg-slate-200 px-3 py-6 text-black">
            <PageHeader>Реквизиты</PageHeader>
            <TableProvider>
                <TableLayoutWithoutSidebar>
                    <header className="flex items-center justify-between rounded-t-lg bg-white px-3 py-4">
                        <h2 className="text-xl leading-none">
                            Список реквизитов
                        </h2>

                        <AddRequisiteButton />
                    </header>

                    <RequisiteTableWidget />

                    <TableFooter />
                </TableLayoutWithoutSidebar>
            </TableProvider>
        </article>
    );
};
