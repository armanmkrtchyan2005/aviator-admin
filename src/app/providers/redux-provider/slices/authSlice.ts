import { createSlice } from "@reduxjs/toolkit";
import { adminApi } from "../api";
import { RootStore } from "../types";

export const authSlice = createSlice({
    name: "auth",
    initialState: () => {
        const storedData = localStorage.getItem("token");

        if (!storedData)
            return {
                token: null,
                isAuthenticated: false
            };

        const { token } = JSON.parse(storedData);

        return {
            token,
            isAuthenticated: true
        };
    },
    reducers: {
        logout: state => {
            localStorage.removeItem("token");
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            adminApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                localStorage.setItem(
                    "token",
                    JSON.stringify({ token: payload.token })
                );
                state.token = payload.token;
                state.isAuthenticated = true;
            }
        );
    }
});

export const { reducer: authReducer, actions: authActions } = authSlice;

export const { logout } = authSlice.actions;

export const selectToken = (state: RootStore) => state.auth.token;
export const selectAuthenticationStatus = (state: RootStore) =>
    state.auth.isAuthenticated;
