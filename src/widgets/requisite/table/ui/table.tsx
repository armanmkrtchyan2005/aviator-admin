import { FetchRequisite } from "@/features/requisite/fetch";
import { RequisitesTable } from "@/entities/requisite";
import { columns } from "../model/columns";

export const RequisiteTableWidget = () => {
    return (
        <FetchRequisite
            renderSuccess={data => (
                <RequisitesTable
                    data={data}
                    columns={columns}
                />
            )}
        />
    );
};
