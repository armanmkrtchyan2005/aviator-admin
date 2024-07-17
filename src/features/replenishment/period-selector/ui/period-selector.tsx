import { useAppDispatch } from "@/app/providers/redux-provider";
import {
    replenishmentApi,
    useLazyFetchAllReplenishmentsQuery
} from "@/entities/replenishment";
import { DatePicker, FormFields } from "@/shared/ui/date-picker";
import { useSessionStorage } from "@/shared/lib/hooks";
import { formatDate } from "@/shared/lib/format-date";

export const ReplenishmentPeriodSelector = () => {
    const [refetch, { isLoading }] = useLazyFetchAllReplenishmentsQuery();
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
            replenishmentApi.util.updateQueryData(
                "fetchAllReplenishments",
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
