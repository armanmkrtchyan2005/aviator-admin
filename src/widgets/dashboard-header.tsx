import { useMemo } from "react";

import { useFetchUserInfoQuery } from "@/entities/user";
import { useFetchAllRequisitesQuery } from "@/entities/requisite";

export const DashboardHeader = () => {
    const { data: user, isLoading: isUserLoading } = useFetchUserInfoQuery();
    const { data: requisites, isLoading: isRequisitesLoading } =
        useFetchAllRequisitesQuery();

    const isIndicatorHighlighted = useMemo(() => {
        return requisites?.some(requisite => requisite.active);
    }, [requisites]);

    return (
        <header className="flex min-h-16 items-center rounded-lg bg-yellow-100 px-3 text-xl text-black">
            {isUserLoading || isRequisitesLoading ? (
                <>
                    <span className="h-3 w-28 animate-pulse rounded-full bg-slate-400" />
                    <span className="ml-2 h-4 w-4 animate-pulse rounded-full bg-slate-400" />
                </>
            ) : (
                <>
                    <span>{user?.balance?.toFixed(2)} USDT</span>
                    <span
                        title={
                            isIndicatorHighlighted
                                ? "Пополнения включены"
                                : "Пополнения отключены"
                        }
                        className={`ml-2 inline-block h-4 w-4 rounded-full ${isIndicatorHighlighted ? "bg-lime-500" : "bg-red-500"}`}
                    />
                </>
            )}
        </header>
    );
};
