import { useFetchAllWithdrawalsQuery, Withdrawal } from "@/entities/withdrawal";
import { useAuth } from "@/app/providers/redux-provider";
import { useSessionStorage } from "@/shared/lib/hooks/use-session-storage";
import { ScaleLoader } from "react-spinners";

interface FetchWithdrawalProps {
    renderSuccess: (withdrawals: Withdrawal[]) => React.ReactElement;
    loadingFallback?: React.ReactNode;
    renderError?: (error: string) => React.ReactElement;
}

export const FetchWithdrawal: React.FC<FetchWithdrawalProps> = ({
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
    const { data, isLoading, isError, error } = useFetchAllWithdrawalsQuery(
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