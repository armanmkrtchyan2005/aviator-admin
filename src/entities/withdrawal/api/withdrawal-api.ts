import { adminApi } from "@/app/providers/redux-provider";

import type { FetchAllWithdrawalsRequest, Withdrawal } from "./types";

export const withdrawalApi = adminApi
    .enhanceEndpoints({
        addTagTypes: ["Withdrawal"]
    })
    .injectEndpoints({
        endpoints: builder => ({
            fetchAllWithdrawals: builder.query<
                Withdrawal[],
                FetchAllWithdrawalsRequest | void
            >({
                query: params => ({
                    url: "/admin/withdrawals",
                    params: params || undefined
                }),
                providesTags: result =>
                    result
                        ? [
                              ...result.map(({ _id }) => ({
                                  type: "Withdrawal" as const,
                                  id: _id as string
                              })),
                              "Withdrawal"
                          ]
                        : ["Withdrawal"]
            }),
            confirmWithdrawalById: builder.mutation<
                { message: string },
                { id: string }
            >({
                query: ({ id }) => ({
                    url: `/admin/withdrawals/${id}`,
                    method: "PUT"
                }),
                // invalidatesTags: (result, error, arg) =>
                //     error ? [] : [{ type: "Withdrawal", id: arg.id }]
                async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        dispatch(
                            withdrawalApi.util.updateQueryData(
                                "fetchAllWithdrawals",
                                {
                                    startDate: JSON.parse(
                                        sessionStorage.getItem(
                                            "durationTimeLapse"
                                        ) || ""
                                    )?.startDate,
                                    endDate: JSON.parse(
                                        sessionStorage.getItem(
                                            "durationTimeLapse"
                                        ) || ""
                                    )?.endDate
                                },
                                draft => {
                                    const index = draft.findIndex(
                                        withdrawal => withdrawal._id === id
                                    );

                                    Object.assign(draft[index], {
                                        status: "Успешно"
                                    });
                                }
                            )
                        );
                    } catch {}
                }
            }),
            activateWithdrawalById: builder.mutation<
                { message: string },
                { id: string }
            >({
                query: ({ id }) => ({
                    url: `/admin/withdrawals/${id}/activate`,
                    method: "PUT"
                }),
                invalidatesTags: (result, error, arg) =>
                    error ? [] : [{ type: "Withdrawal", id: arg.id }]
            }),
            cancelWithdrawalById: builder.mutation<
                { message: string },
                { id: string; statusMessage: string }
            >({
                query: ({ id, statusMessage }) => ({
                    url: `/admin/withdrawals/${id}/cancel`,
                    method: "PUT",
                    body: { statusMessage }
                }),
                // invalidatesTags: (result, error, arg) =>
                //     error ? [] : [{ type: "Withdrawal", id: arg.id }]

                async onQueryStarted(
                    { id, statusMessage },
                    { dispatch, queryFulfilled }
                ) {
                    try {
                        await queryFulfilled;
                        dispatch(
                            withdrawalApi.util.updateQueryData(
                                "fetchAllWithdrawals",
                                {
                                    startDate: JSON.parse(
                                        sessionStorage.getItem(
                                            "durationTimeLapse"
                                        ) || ""
                                    )?.startDate,
                                    endDate: JSON.parse(
                                        sessionStorage.getItem(
                                            "durationTimeLapse"
                                        ) || ""
                                    )?.endDate
                                },
                                draft => {
                                    const index = draft.findIndex(
                                        withdrawal => withdrawal._id === id
                                    );

                                    Object.assign(draft[index], {
                                        statusMessage,
                                        status: "Отменена"
                                    });
                                }
                            )
                        );
                    } catch {}
                }
            })
        })
    });

export const {
    useFetchAllWithdrawalsQuery,
    useLazyFetchAllWithdrawalsQuery,
    useConfirmWithdrawalByIdMutation,
    useActivateWithdrawalByIdMutation,
    useCancelWithdrawalByIdMutation
} = withdrawalApi;
