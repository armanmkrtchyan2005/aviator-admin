import { adminApi } from "@/app/providers/redux-provider";

import { FetchDepositHistoryResponse, Deposit } from "./types";

export const balanceApi = adminApi.injectEndpoints({
    endpoints: builder => ({
        fetchDepositHistory: builder.query<Deposit[], void>({
            query: () => ({
                url: "/admin/replenishment-history"
            }),
            transformResponse: (data: FetchDepositHistoryResponse) => {
                return data.history.sort(
                    (a, b) => (new Date(b) - new Date(a)) as number
                );
            }
        })
    })
});

export const { useFetchDepositHistoryQuery, useLazyFetchDepositHistoryQuery } =
    balanceApi;
