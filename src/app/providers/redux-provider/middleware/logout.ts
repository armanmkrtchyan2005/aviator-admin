import { Middleware } from "redux";
import { RootStore } from "../types";

import { userApi } from "@/entities/user";
import { replenishmentApi } from "@/entities/replenishment";
import { withdrawalApi } from "@/entities/withdrawal";
import { balanceApi } from "@/entities/balance";
import { requisiteApi } from "@/entities/requisite";

// Typed middleware
export const authMiddleware: Middleware<{}, RootStore> =
    store => next => action => {
        if (action.type === "auth/logout") {
            store.dispatch(userApi.util.resetApiState());
            store.dispatch(replenishmentApi.util.resetApiState());
            store.dispatch(withdrawalApi.util.resetApiState());
            store.dispatch(balanceApi.util.resetApiState());
            store.dispatch(requisiteApi.util.resetApiState());
        }

        return next(action);
    };
