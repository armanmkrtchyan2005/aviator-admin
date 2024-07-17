import { useState, useId } from "react";

import { useAddNewRequisiteMutation } from "@/entities/requisite";
import { handleErrorResponse } from "@/shared/lib/helpers";

import { Button } from "@/shared/ui/button";

import { ImSpinner9 } from "react-icons/im";
import { IoWarningOutline } from "react-icons/io5";

interface AddRequisiteFormProps extends React.ComponentPropsWithRef<"form"> {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormFields {
    requisite: HTMLInputElement;
}

export const AddRequisiteForm: React.FC<AddRequisiteFormProps> = ({
    setOpen,
    ...props
}) => {
    const [errorState, setErrorState] = useState<{
        isError: boolean;
        message: string | null;
    }>({
        isError: false,
        message: null
    });
    const requisiteId = useId();
    const errorId = useId();

    const [addNewRequisite, { isLoading }] = useAddNewRequisiteMutation();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();
        setErrorState({ isError: false, message: null });

        const { requisite } = event.currentTarget;

        try {
            await addNewRequisite({ requisite: requisite.value }).unwrap();
            setOpen(false);
        } catch (error) {
            handleErrorResponse(error, message =>
                setErrorState({ isError: true, message: message })
            );
        }
    };

    const onFocusHandler: React.FocusEventHandler<HTMLInputElement> = () => {
        setErrorState({ isError: false, message: null });
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="mt-4 grid w-full gap-y-4 px-4 text-slate-700"
            {...props}
        >
            <label className="grid grid-rows-[auto_auto] gap-y-1 ">
                <span className="font-medium">Реквизит</span>
                <input
                    id={requisiteId}
                    name="requisite"
                    autoComplete="off"
                    aria-invalid={errorState.isError}
                    aria-errormessage={errorState.isError ? errorId : undefined}
                    required
                    onFocus={onFocusHandler}
                    className="rounded-md border px-2 py-1.5 text-center shadow-md focus-visible:outline-blue-300 aria-[invalid=false]:border-slate-600 aria-[invalid=true]:border-red-700"
                />
                {errorState.isError ? (
                    <output
                        id={errorId}
                        htmlFor={requisiteId}
                        className="block text-xs text-red-700"
                    >
                        <IoWarningOutline className="mt-[1.5px] inline align-top" />{" "}
                        {errorState.message}
                    </output>
                ) : null}
            </label>

            <Button
                disabled={isLoading}
                variant="success"
                className="mx-auto"
            >
                {isLoading ? (
                    <ImSpinner9 className="mx-auto h-6 animate-spin text-lg" />
                ) : (
                    "Сохранить"
                )}
            </Button>
        </form>
    );
};
