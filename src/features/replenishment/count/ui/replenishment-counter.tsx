import { FetchReplenishments } from "../../fetch";
import { formatOrdinals } from "@/shared/lib";

export const ReplenishmentCounter = () => {
    return (
        <FetchReplenishments
            renderSuccess={replenishments => (
                <span className="text-slate-500">
                    {replenishments.length !== 0
                        ? formatOrdinals(replenishments.length, "заяв")
                        : "0 заявок"}
                </span>
            )}
            loadingFallback={
                <span className="h-3 w-20 animate-pulse rounded-full bg-slate-400" />
            }
        />
    );
};
