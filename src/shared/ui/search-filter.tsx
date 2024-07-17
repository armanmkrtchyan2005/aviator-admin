import { useRef } from "react";
import { cn } from "../lib/tailwind-merge";

import { IoSearchSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

interface FormFields {
    query: HTMLInputElement;
}

interface SearchFilterProps extends React.ComponentPropsWithRef<"form"> {}

export const SearchFilter: React.FC<SearchFilterProps> = ({
    className,
    onSubmit,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmitHandler: React.FormEventHandler<
        HTMLFormElement & FormFields
    > = event => {
        event.preventDefault();

        onSubmit?.(event);
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className={cn("flex h-10 w-5/12", className)}
            {...props}
        >
            <div className="group flex h-full basis-full items-center overflow-hidden rounded-l-full border-2 border-slate-300 has-[button[type=reset]:active]:border-blue-300 has-[input:focus]:border-blue-300">
                <div className="hidden shrink-0 pl-4 group-has-[button[type=reset]:active]:block group-has-[input:focus]:block">
                    <IoSearchSharp className="text-xl" />
                </div>
                <input
                    type="search"
                    placeholder="Введите запрос"
                    autoComplete="off"
                    name="query"
                    ref={inputRef}
                    className="peer h-full min-w-16 flex-auto bg-transparent pl-4 pr-2 focus-visible:outline-transparent"
                />
                <button
                    type="reset"
                    onClick={() => inputRef.current?.focus()}
                    className="block shrink-0 px-2 peer-placeholder-shown:hidden"
                >
                    <IoCloseSharp className="text-xl" />
                </button>
            </div>
            <button className="flex w-16 items-center justify-center rounded-none rounded-r-full border-2 border-l-0 border-slate-300 bg-slate-200">
                <IoSearchSharp className="text-xl" />
                <span className="sr-only">Поиск</span>
            </button>
        </form>
    );
};
