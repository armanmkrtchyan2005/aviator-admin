import { BalanceTable } from "@/entities/balance";
import { columns } from "../model/columns";
import { FetchDepositHistory } from "@/features/balance/fetch";

export const BalanceTableWidget = () => {
    return (
        <FetchDepositHistory
            renderSuccess={data => (
                <BalanceTable
                    data={data}
                    columns={columns}
                />
            )}
        />
    );
};
