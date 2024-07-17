import { useId, useRef } from "react";

import { useSessionStorage } from "../lib/hooks";
import { formatDateToString } from "../lib";

import { cn } from "../lib/tailwind-merge";

import { TbRefresh } from "react-icons/tb";

export interface FormFields {
    startDate: HTMLInputElement;
    endDate: HTMLInputElement;
}

interface DatePickerProps extends React.ComponentProps<"form"> {
    onSubmit?: React.FormEventHandler<HTMLFormElement & FormFields>;
    isLoading?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    className,
    isLoading,
    ...props
}) => {
    const startDateId = useId();
    const endDateId = useId();

    const startDateInputRef = useRef<HTMLInputElement>(null);
    const endDateInputRef = useRef<HTMLInputElement>(null);

    const { getItem: getDurationTimeLapse } =
        useSessionStorage("durationTimeLapse");
    const durationTimeLapse = getDurationTimeLapse();

    const onStartDateChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;

        if (input.value === "" || !endDateInputRef.current) return;

        const startDate = new Date(input.value);
        const endDate = new Date(endDateInputRef.current.value);

        if (startDate >= endDate) {
            input.value = formatDateToString(endDate);
        }
    };

    const onEndDateChangeHandler: React.ChangeEventHandler<
        HTMLInputElement
    > = event => {
        const input = event.currentTarget;

        if (input.value === "" || !startDateInputRef.current?.value) return;

        const startDate = new Date(startDateInputRef.current.value);
        const endDate = new Date(input.value);

        if (endDate <= startDate) {
            input.value = formatDateToString(startDate);
        }
    };

    return (
        <form
            className={cn("mx-auto flex items-center gap-x-3", className)}
            {...props}
        >
            <label htmlFor={startDateId}>Дата начала</label>
            <input
                id={startDateId}
                type="date"
                name="startDate"
                required
                defaultValue={formatDateToString(
                    new Date(durationTimeLapse?.startDate)
                )}
                onChange={onStartDateChangeHandler}
                ref={startDateInputRef}
                className="cursor-pointer rounded-md border-2 border-slate-300 px-2 py-1 focus-visible:outline-blue-300"
            />

            <label htmlFor={endDateId}>Дата окончания</label>
            <input
                id={endDateId}
                type="date"
                name="endDate"
                defaultValue={formatDateToString(
                    new Date(durationTimeLapse?.endDate)
                )}
                onChange={onEndDateChangeHandler}
                ref={endDateInputRef}
                className="cursor-pointer rounded-md border-2 border-slate-300 px-2 py-1 focus-visible:outline-blue-300"
            />
            <button
                disabled={isLoading}
                className="group text-2xl text-blue-500 duration-300 active:scale-90 disabled:cursor-wait"
            >
                <TbRefresh className="duration-300 group-hover:rotate-180 group-hover:scale-110" />
            </button>
        </form>
    );
};
