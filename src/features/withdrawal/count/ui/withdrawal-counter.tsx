import { FetchWithdrawal } from "../../fetch";
import { formatOrdinals } from "@/shared/lib";

export const WithdrawalCounter = () => {
    return (
        <FetchWithdrawal
            renderSuccess={withdrawal => (
                <span className="text-slate-500">
                    {withdrawal.length !== 0
                        ? formatOrdinals(withdrawal.length, "заяв")
                        : "0 заявок"}
                </span>
            )}
            loadingFallback={
                <span className="h-3 w-20 animate-pulse rounded-full bg-slate-400" />
            }
        />
    );
};
