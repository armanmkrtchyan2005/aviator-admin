import React, { useState, useId } from "react";
import { useNavigate } from "react-router-dom";

import { useCancelWithdrawalByIdMutation } from "@/entities/withdrawal";
import { handleErrorResponse } from "@/shared/lib/helpers";

import { Button } from "@/shared/ui/button";

import { IoWarningOutline } from "react-icons/io5";
import { ImSpinner9 } from "react-icons/im";

interface FormFields {
    reason: HTMLInputElement;
}

interface CancelWithdrawalFormProps extends React.ComponentProps<"form"> {
    withdrawalId: string | undefined;
}

export const CancelWithdrawalForm: React.FC<CancelWithdrawalFormProps> = ({
    withdrawalId,
    ...props
}) => {
    const [errorState, setErrorState] = useState({
        isError: false,
        message: ""
    });

    const errorId = useId();
    const reasonId = useId();

    const navigate = useNavigate();

    const [cancel, { isLoading }] = useCancelWithdrawalByIdMutation();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();

        if (withdrawalId === undefined) return;

        const { reason } = event.currentTarget;

        try {
            const { message } = await cancel({
                id: withdrawalId,
                statusMessage: reason.value
            }).unwrap();

            alert(message);
            navigate("/withdrawal", { replace: true });
        } catch (error) {
            handleErrorResponse(error, message =>
                setErrorState(state => ({
                    ...state,
                    isError: true,
                    message: message
                }))
            );
        }
    };

    const onFocusHandler: React.FocusEventHandler<HTMLInputElement> = () => {
        setErrorState(state => ({ ...state, isError: false, message: "" }));
    };

    return (
        <form
            {...props}
            onSubmit={onSubmitHandler}
            className="mt-6 space-y-4 text-black"
        >
            <label className="grid gap-y-2">
                <span className="font-medium">Укажите причину отмены</span>
                <input
                    id={reasonId}
                    name="reason"
                    required
                    autoComplete="off"
                    aria-invalid={errorState?.isError}
                    aria-errormessage={
                        errorState?.isError ? errorId : undefined
                    }
                    onFocus={onFocusHandler}
                    className="rounded-lg border-2 border-slate-400 px-4 py-2 focus-visible:outline-blue-300 aria-[invalid=false]:border-slate-300 aria-[invalid=true]:border-red-700"
                />

                {errorState?.isError ? (
                    <output
                        id={errorId}
                        htmlFor={reasonId}
                        className="block text-xs text-red-700"
                    >
                        <IoWarningOutline className="mt-[1.5px] inline align-top" />{" "}
                        {errorState.message}
                    </output>
                ) : null}
            </label>

            <Button
                disabled={isLoading}
                variant="danger"
                className="mx-auto block disabled:cursor-wait"
            >
                {isLoading ? (
                    <ImSpinner9 className="mx-auto h-6 animate-spin text-lg" />
                ) : (
                    "Отменить"
                )}
            </Button>
        </form>
    );
};
