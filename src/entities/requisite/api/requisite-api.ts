import { adminApi } from "@/app/providers/redux-provider";

import type {
    Requisite,
    AddRequisiteRequest,
    ToggleRequisiteStatusRequest
} from "./types";

export const requisiteApi = adminApi
    .enhanceEndpoints({ addTagTypes: ["Requisite"] })
    .injectEndpoints({
        endpoints: builder => ({
            fetchAllRequisites: builder.query<Requisite[], void>({
                query: () => "/admin/requisites",
                providesTags: result =>
                    result
                        ? [
                              ...result.map(({ _id }) => ({
                                  type: "Requisite" as const,
                                  id: _id as string
                              })),
                              "Requisite"
                          ]
                        : ["Requisite"]
            }),
            addNewRequisite: builder.mutation<Requisite, AddRequisiteRequest>({
                query: body => ({
                    url: "/admin/requisites",
                    method: "POST",
                    body
                }),
                invalidatesTags: (result, error) => (error ? [] : ["Requisite"])
            }),
            toggleRequisiteStatus: builder.mutation<
                Requisite,
                ToggleRequisiteStatusRequest
            >({
                query: ({ id }) => ({
                    url: `/admin/requisites/${id}`,
                    method: "PUT"
                }),

                async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                    try {
                        const { data: updatedRequisite } = await queryFulfilled;
                        dispatch(
                            requisiteApi.util.updateQueryData(
                                "fetchAllRequisites",
                                undefined,
                                draft => {
                                    const index = draft.findIndex(
                                        requisite => requisite._id === id
                                    );
                                    Object.assign(
                                        draft[index],
                                        updatedRequisite
                                    );
                                }
                            )
                        );
                    } catch {}
                }
            }),
            toggleRequisiteCardVerification: builder.mutation<
                Requisite,
                { id: string }
            >({
                query: ({ id }) => ({
                    url: `/admin/requisites/${id}/verify/card`,
                    method: "PUT"
                }),

                async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                    try {
                        const { data: updatedRequisite } = await queryFulfilled;
                        dispatch(
                            requisiteApi.util.updateQueryData(
                                "fetchAllRequisites",
                                undefined,
                                draft => {
                                    const index = draft.findIndex(
                                        requisite => requisite._id === id
                                    );
                                    Object.assign(
                                        draft[index],
                                        updatedRequisite
                                    );
                                }
                            )
                        );
                    } catch {}
                }
            }),
            toggleRequisiteReceiptVerification: builder.mutation<
                Requisite,
                { id: string }
            >({
                query: ({ id }) => ({
                    url: `/admin/requisites/${id}/verify/receipt`,
                    method: "PUT"
                }),

                async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
                    try {
                        const { data: updatedRequisite } = await queryFulfilled;
                        dispatch(
                            requisiteApi.util.updateQueryData(
                                "fetchAllRequisites",
                                undefined,
                                draft => {
                                    const index = draft.findIndex(
                                        requisite => requisite._id === id
                                    );
                                    Object.assign(
                                        draft[index],
                                        updatedRequisite
                                    );
                                }
                            )
                        );
                    } catch {}
                }
            })
        })
    });

export const {
    useFetchAllRequisitesQuery,
    useLazyFetchAllRequisitesQuery,
    useAddNewRequisiteMutation,
    useToggleRequisiteStatusMutation,
    useToggleRequisiteCardVerificationMutation,
    useToggleRequisiteReceiptVerificationMutation
} = requisiteApi;
