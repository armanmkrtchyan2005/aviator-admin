import { createSelector } from "@reduxjs/toolkit";
import { RootStore } from "@/app/providers/redux-provider/types";

const replenishmentId = (state: RootStore) => state.replenishment;

export const selectReplenishmentId = createSelector(
    [replenishmentId],
    replenishmentId => replenishmentId
);
