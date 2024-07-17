import { useRouteError } from "react-router-dom";

import ErrorPageIcon from "@/assets/error-page-icon.webp";
import { IoWarningOutline } from "react-icons/io5";

export const ErrorPage = () => {
    const error = useRouteError();

    return (
        <section className="flex h-full min-h-screen w-full flex-col place-items-center gap-y-4 bg-slate-100 py-8 text-center text-black">
            <h1 className="text-5xl font-semibold">Что-то пошло не так</h1>
            <pre className="text-2xl font-medium text-red-500">
                <IoWarningOutline className="mt-[3px] inline align-top" />{" "}
                <span>{error?.message}</span>
            </pre>
            <img
                src={ErrorPageIcon}
                alt="Произошла ошибка"
                className="mx-auto"
            />
        </section>
    );
};
