import { useFetchUserInfoQuery } from "@/entities/user";
import { FetchReplenishments } from "@/features/replenishment/fetch";
import { ReplenishmentsTable } from "@/entities/replenishment/ui";
import { columns } from "../model/columns";

export const ReplenishmentsTableWidget = () => {
    const { data: user } = useFetchUserInfoQuery();

    return (
        <FetchReplenishments
            renderSuccess={data => (
                <ReplenishmentsTable
                    data={data}
                    columns={columns(
                        user?.requisite?.currency,
                        user?.replenishmentBonus
                    )}
                />
            )}
        />
    );
};
