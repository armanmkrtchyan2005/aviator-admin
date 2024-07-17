import { Link, useNavigate, useParams } from "react-router-dom";

import { useConfirmWithdrawalByIdMutation } from "@/entities/withdrawal";
import { handleErrorResponse } from "@/shared/lib/helpers/handle-error";
import { FetchWithdrawal } from "../../fetch";

import * as Dialog from "@radix-ui/react-dialog";

import { Button, buttonVariants } from "@/shared/ui/button";
import { CgClose } from "react-icons/cg";

export const ConfirmWithdrawalDialog = () => {
    const navigate = useNavigate();
    const { withdrawalId: withdrawalId } = useParams();

    const [confirm, { isLoading }] = useConfirmWithdrawalByIdMutation();

    const onClickHandler = async (amount: number | undefined) => {
        try {
            if (withdrawalId === undefined) return;

            await confirm({ id: withdrawalId }).unwrap();

            alert(
                `Заявка на сумму ${amount?.toFixed(2)} была успешно подтверждена`
            );

            navigate("/withdrawal", { replace: true });
        } catch (error) {
            handleErrorResponse(error, message => alert(message));
        }
    };

    return (
        <FetchWithdrawal
            renderSuccess={withdrawals => {
                const withdrawal = withdrawals?.find(
                    withdrawal => withdrawal._id === withdrawalId
                );

                return (
                    <Dialog.Root
                        modal={false}
                        defaultOpen={true}
                    >
                        <Dialog.Portal>
                            <Dialog.Content
                                onPointerDownOutside={() =>
                                    navigate("/withdrawal", { replace: true })
                                }
                                onEscapeKeyDown={() =>
                                    navigate("/withdrawal", { replace: true })
                                }
                                className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] isolate z-30 h-max w-full max-w-xl translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-6 text-white shadow-lg duration-200"
                            >
                                <Dialog.Close
                                    asChild
                                    className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500"
                                >
                                    <Link
                                        to="/withdrawal"
                                        replace={true}
                                    >
                                        <CgClose className="text-xl text-black" />
                                        <span className="sr-only">Закрыть</span>
                                    </Link>
                                </Dialog.Close>

                                <Dialog.Title className="text-balance text-center text-xl font-semibold text-black">
                                    {`Вы уверены что хотите подтвердить заявку на вывод на сумму
                ${withdrawal?.amount[withdrawal?.requisite?.currency]?.toFixed(2)} ${withdrawal?.requisite?.currency}?`}
                                </Dialog.Title>

                                <div className="mt-6 space-x-4 text-right">
                                    <Button
                                        variant="success"
                                        disabled={isLoading}
                                        onClick={() =>
                                            onClickHandler(
                                                withdrawal?.amount[
                                                    withdrawal?.requisite
                                                        ?.currency
                                                ]
                                            )
                                        }
                                        className="disabled:cursor-wait"
                                    >
                                        Да
                                    </Button>

                                    <Dialog.Close
                                        asChild
                                        className={buttonVariants({
                                            variant: "danger"
                                        })}
                                    >
                                        <Link
                                            to="/withdrawal"
                                            replace={true}
                                        >
                                            Нет
                                        </Link>
                                    </Dialog.Close>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                );
            }}
        />
    );
};
