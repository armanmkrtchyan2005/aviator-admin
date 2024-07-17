import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginMutation } from "@/app/providers/redux-provider";

import { ImSpinner9 } from "react-icons/im";
import { IoWarningOutline } from "react-icons/io5";
import { handleErrorResponse } from "@/shared/lib/helpers";

interface LoginFormProps extends React.ComponentProps<"form"> {}

interface FormFields {
    login: HTMLInputElement;
    password: HTMLInputElement;
}

export const LoginForm: React.FC<LoginFormProps> = ({ ...props }) => {
    const [error, setError] = useState<{
        isError: boolean;
        message: string | null;
    }>({
        isError: false,
        message: null
    });

    const navigate = useNavigate();
    const [signIn, { isLoading }] = useLoginMutation();

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = async event => {
        event.preventDefault();
        setError({
            isError: false,
            message: null
        });

        try {
            const { login, password } = event.currentTarget;

            await signIn({
                login: login.value,
                password: password.value
            }).unwrap();

            navigate("/replenishment");
        } catch (error) {
            handleErrorResponse(error, message => {
                setError({
                    isError: true,
                    message: message
                });
            });
        }
    };

    const onFocusHandler: React.FocusEventHandler<HTMLInputElement> = () => {
        setError({
            isError: false,
            message: null
        });
    };

    return (
        <section className="fixed left-1/2 top-1/2 mx-auto w-full max-w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-slate-100">
            <h1 className="bg-lime-900 p-2 text-center text-xl font-semibold">
                Добро пожаловать
            </h1>

            <form
                onSubmit={onSubmitHandler}
                className="grid w-full gap-y-4 px-2 py-4 text-slate-700"
                {...props}
            >
                <label className="grid grid-rows-[auto_auto] gap-y-1">
                    <span className="font-medium">Логин</span>
                    <input
                        name="login"
                        autoComplete="off"
                        aria-invalid={error?.isError}
                        required
                        onFocus={onFocusHandler}
                        className="rounded-md border px-2 py-1.5 text-center shadow-md focus-visible:outline-slate-500 aria-[invalid=false]:border-slate-600 aria-[invalid=true]:border-red-700"
                    />
                </label>

                <label className="grid grid-rows-[auto_auto] gap-y-1">
                    <span className="font-medium">Пароль</span>
                    <input
                        type="password"
                        name="password"
                        required
                        autoComplete="off"
                        aria-invalid={error?.isError}
                        onFocus={onFocusHandler}
                        className="rounded-md border px-2 py-1.5 text-center shadow-md focus-visible:outline-slate-500 aria-[invalid=false]:border-slate-600 aria-[invalid=true]:border-red-700"
                    />
                </label>

                {error?.isError ? (
                    <output className="block text-xs text-red-700">
                        <IoWarningOutline className="mt-[1.5px] inline align-top" />{" "}
                        {error?.message}
                    </output>
                ) : null}

                <button
                    disabled={isLoading}
                    className="mx-auto min-w-28 rounded-md bg-blue-600 px-3 py-1.5 text-lg font-semibold text-white shadow-lg transition-colors duration-150 hover:bg-blue-500 disabled:pointer-events-none disabled:bg-gray-400"
                >
                    {isLoading ? (
                        <ImSpinner9 className="mx-auto animate-spin py-1 text-xl" />
                    ) : (
                        "Войти"
                    )}
                </button>
            </form>
        </section>
    );
};
