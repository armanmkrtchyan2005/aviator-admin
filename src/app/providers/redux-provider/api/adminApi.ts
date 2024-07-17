import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError
} from "@reduxjs/toolkit/query";
import { AuthorizationCredentialsRequest, TokenResponse } from "./types";
import { RootStore } from "../types";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootStore).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithLogout: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch({ type: "auth/logout" });
    }

    return result;
};

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: baseQueryWithLogout,
    endpoints: builder => ({
        login: builder.mutation<TokenResponse, AuthorizationCredentialsRequest>(
            {
                query: body => ({
                    url: "admin/login",
                    method: "POST",
                    body
                })
            }
        )
    })
});

export const { useLoginMutation } = adminApi;
