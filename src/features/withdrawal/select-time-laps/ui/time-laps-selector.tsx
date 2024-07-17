import { useAppDispatch } from "@/app/providers/redux-provider";
import {
    withdrawalApi,
    useLazyFetchAllWithdrawalsQuery
} from "@/entities/withdrawal/api";
import { DatePicker, FormFields } from "@/shared/ui/date-picker";
import { useSessionStorage } from "@/shared/lib/hooks";

export const WithdrawalTimeLapsSelector = () => {
    const [refetch, { isLoading }] = useLazyFetchAllWithdrawalsQuery();
    const dispatch = useAppDispatch();
    const { getItem: getDurationTimeLapse, setItem: setDurationTimeLapse } =
        useSessionStorage("durationTimeLapse");

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();

        const { startDate, endDate } = event.currentTarget;

        const start = new Date(startDate.value);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate.value);
        end.setHours(23, 59, 59, 999);

        const response = await refetch({
            startDate: start.toISOString(),
            endDate: end.toISOString()
        });

        dispatch(
            withdrawalApi.util.updateQueryData(
                "fetchAllWithdrawals",
                {
                    startDate: getDurationTimeLapse()?.startDate,
                    endDate: getDurationTimeLapse()?.endDate
                },
                () => {
                    return response?.data;
                }
            )
        );

        setDurationTimeLapse({ startDate: start, endDate: end });
    };

    return (
        <DatePicker
            onSubmit={onSubmitHandler}
            isLoading={isLoading}
        />
    );
};
