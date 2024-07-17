import { FetchReplenishments } from "@/features/replenishment/fetch";
import {
    CategoryFilter,
    CategoryFilterSkeleton
} from "@/features/user/filtrate";

export const ReplenishmentCategoryFilterWidget = () => {
    return (
        <FetchReplenishments
            renderSuccess={data => <CategoryFilter data={data} />}
            loadingFallback={<CategoryFilterSkeleton />}
        />
    );
};
