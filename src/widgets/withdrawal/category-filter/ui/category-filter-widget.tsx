import { FetchWithdrawal } from "@/features/withdrawal/fetch";
import {
    CategoryFilter,
    CategoryFilterSkeleton
} from "@/features/user/filtrate";

export const WithdrawalCategoryFilterWidget = () => {
    return (
        <FetchWithdrawal
            renderSuccess={data => <CategoryFilter data={data} />}
            loadingFallback={<CategoryFilterSkeleton />}
        />
    );
};
