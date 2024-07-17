import { useAuth } from "@/app/providers/redux-provider";
import {
    useFetchAllReplenishmentsQuery,
    Replenishment
} from "@/entities/replenishment";
import { useSessionStorage } from "@/shared/lib/hooks";

import { ScaleLoader } from "react-spinners";

interface FetchReplenishmentsProps {
    renderSuccess: (replenishments: Replenishment[]) => React.ReactElement;
    loadingFallback?: React.ReactNode;
    renderError?: (error: string) => React.ReactElement;
}

export const FetchReplenishments: React.FC<FetchReplenishmentsProps> = ({
    renderSuccess,
    loadingFallback = (
        <div className="flex w-full items-center justify-center px-3">
            <ScaleLoader color="rgb(54, 215, 183)" />
        </div>
    ),
    renderError = error => (
        <pre className="self-center text-center text-red-700">
            {error || "Неизвестная ошибка"}
        </pre>
    )
}) => {
    const { isAuthenticated } = useAuth();
    const { getItem: getDurationTimeLapse } =
        useSessionStorage("durationTimeLapse");
    const durationTimeLapse = getDurationTimeLapse();
    const { data, isLoading, isError, error } = useFetchAllReplenishmentsQuery(
        {
            startDate: durationTimeLapse?.startDate,
            endDate: durationTimeLapse?.endDate
        },
        { skip: !isAuthenticated, pollingInterval: 60000 }
    );

    if (isLoading) return loadingFallback;

    if (isError) return renderError(error?.data?.message);

    if (data) return renderSuccess(data);

    return <pre>Нет данных</pre>;
};
