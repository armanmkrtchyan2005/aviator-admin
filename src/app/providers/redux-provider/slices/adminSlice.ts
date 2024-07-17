import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootStore } from "../types";

const initialState = {
    searchQuery: ""
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        }
    }
});

export const { reducer: adminReducer, actions: adminActions } = adminSlice;

export const { setSearchQuery } = adminSlice.actions;

const selectSearchFilter = (state: RootStore) => state.admin.searchQuery;

export const selectGlobalFilter = createSelector(
    [selectSearchFilter],
    searchQuery => {
        return searchQuery;
    }
);
