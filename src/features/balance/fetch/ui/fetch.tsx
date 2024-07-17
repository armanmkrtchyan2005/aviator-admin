import { ScaleLoader } from "react-spinners";
import { useFetchDepositHistoryQuery, Deposit } from "@/entities/balance";

interface FetchDepositHistoryProps {
    renderSuccess: (depositHistory: Deposit[]) => React.ReactElement;
    loadingFallback?: React.ReactNode;
    renderError?: (error: string) => React.ReactElement;
}

export const FetchDepositHistory: React.FC<FetchDepositHistoryProps> = ({
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
    const { data, isLoading, isError, error } = useFetchDepositHistoryQuery();

    if (isLoading) return loadingFallback;

    if (isError) return renderError(error?.data?.message);

    if (data) return renderSuccess(data);

    return <pre>Нет данных</pre>;
};
