import { useFetchUserInfoQuery } from "@/entities/user";
import { FetchWithdrawal } from "@/features/withdrawal/fetch";
import { WithdrawalTable } from "@/entities/withdrawal";
import { columns } from "../model/columns";

export const WithdrawalTableWidget = () => {
    const { data: user } = useFetchUserInfoQuery();

    return (
        <FetchWithdrawal
            renderSuccess={data => (
                <WithdrawalTable
                    data={data}
                    columns={columns(
                        user?.requisite?.currency,
                        user?.withdrawalBonus
                    )}
                />
            )}
        />
    );
};
