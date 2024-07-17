import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ReplenishmentId = string | null;

const initialState = null as ReplenishmentId;

const replenishmentSlice = createSlice({
    name: "replenishmentSlice",
    initialState,
    reducers: {
        setReplenishmentId: (state, action: PayloadAction<string>) => {
            return action.payload;
        }
    }
});

export const { reducer: replenishmentReducer, actions: replenishmentActions } =
    replenishmentSlice;

export const { setReplenishmentId } = replenishmentSlice.actions;
