import { adminApi } from "@/app/providers/redux-provider";

import type {
    Replenishment,
    ConfirmReplenishmentByIdRequest,
    FetchAllReplenishmentsRequest,
    CancelReplenishmentByIdRequest,
    SuccessResponse
} from "./types";

export const replenishmentApi = adminApi
    .enhanceEndpoints({
        addTagTypes: ["Replenishment"]
    })
    .injectEndpoints({
        endpoints: builder => ({
            fetchAllReplenishments: builder.query<
                Replenishment[],
                FetchAllReplenishmentsRequest | void
            >({
                query: params => ({
                    url: "/admin/replenishments",
                    params: params || undefined
                }),
                providesTags: result =>
                    result
                        ? [
                              ...result.map(({ _id }) => ({
                                  type: "Replenishment" as const,
                                  id: _id as string
                              })),
                              "Replenishment"
                          ]
                        : ["Replenishment"]
            }),
            confirmReplenishmentById: builder.mutation<
                SuccessResponse,
                ConfirmReplenishmentByIdRequest
            >({
                query: ({ id }) => ({
                    url: `/admin/replenishments/${id}`,
                    method: "PUT"
                }),
                // invalidatesTags: (result, error, arg) =>
                //     error ? [] : [{ type: "Replenishment", id: arg.id }],
                async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        dispatch(
                            replenishmentApi.util.updateQueryData(
                                "fetchAllReplenishments",
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
                                        status: "Успешно завершена"
                                    });
                                }
                            )
                        );
                    } catch {}
                }
            }),
            cancelReplenishmentById: builder.mutation<
                SuccessResponse,
                CancelReplenishmentByIdRequest
            >({
                query: ({ id, statusMessage }) => ({
                    url: `/admin/replenishments/${id}/cancel`,
                    method: "PUT",
                    body: { statusMessage }
                }),
                // invalidatesTags: (result, error, arg) =>
                //     error ? [] : [{ type: "Replenishment", id: arg.id }]

                async onQueryStarted(
                    { id, statusMessage },
                    { dispatch, queryFulfilled }
                ) {
                    try {
                        await queryFulfilled;
                        dispatch(
                            replenishmentApi.util.updateQueryData(
                                "fetchAllReplenishments",
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
    useFetchAllReplenishmentsQuery,
    useLazyFetchAllReplenishmentsQuery,
    useConfirmReplenishmentByIdMutation,
    useCancelReplenishmentByIdMutation
} = replenishmentApi;
