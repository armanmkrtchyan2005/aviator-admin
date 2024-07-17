import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./slices/authSlice";
import { adminReducer } from "./slices/adminSlice";
import { replenishmentReducer } from "@/entities/replenishment/model/reducers";
import { adminApi } from "./api";
import { authMiddleware } from "./middleware/logout";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        replenishment: replenishmentReducer,
        [adminApi.reducerPath]: adminApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(adminApi.middleware, authMiddleware)
});
