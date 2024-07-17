import { ClipboardCopy } from "@/shared/ui";
import { FetchDepositHistory } from "@/features/balance/fetch";
import { Button } from "@/shared/ui/button";

export const DepositAddress = () => {
    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        const button = event.currentTarget;
        button.textContent = "Скопировано";
        button.setAttribute("aria-pressed", "true");
        button.setAttribute("disabled", "");

        setTimeout(() => {
            button.textContent = "Скопировать";
            button.setAttribute("aria-pressed", "false");
            button.removeAttribute("disabled");
        }, 3000);
    };

    return (
        <div className="space-y-4 px-3">
            <h3 className="text-lg font-semibold">
                Ваш адрес для пополнения баланса, USDT (TRC20)
            </h3>
            <div className="flex items-center gap-x-4">
                <FetchDepositHistory
                    renderSuccess={data => (
                        <input
                            readOnly
                            value={data.address}
                            className="h-10 w-1/2 rounded-md border border-gray-300 px-2 py-1.5"
                        />
                    )}
                    loadingFallback={
                        <p className="h-10 w-1/2 rounded-md border border-gray-300 px-2 py-1.5">
                            <span className="h-3 w-32 animate-pulse rounded-full bg-slate-400" />
                        </p>
                    }
                />

                <FetchDepositHistory
                    renderSuccess={data => (
                        <ClipboardCopy
                            textToCopy={data.address}
                            onClick={onClickHandler}
                            disabled={data.address?.length === 0}
                            aria-pressed={false}
                            className="min-w-32 duration-200 disabled:bg-slate-400"
                        >
                            Скопировать
                        </ClipboardCopy>
                    )}
                    loadingFallback={
                        <Button variant="success">Скопировать</Button>
                    }
                />
            </div>
        </div>
    );
};
