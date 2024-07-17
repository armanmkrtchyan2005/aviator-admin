import { useActivateWithdrawalByIdMutation } from "@/entities/withdrawal";

import { cn } from "@/shared/lib/tailwind-merge";

import { FaFileCirclePlus } from "react-icons/fa6";

interface AddToActiveListButton
    extends Omit<React.ComponentProps<"button">, "children"> {
    withdrawalId: string;
}

export const AddToActiveListButton: React.FC<AddToActiveListButton> = ({
    className,
    onClick,
    disabled,
    withdrawalId,
    ...props
}) => {
    const [activate, { isLoading }] = useActivateWithdrawalByIdMutation();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async event => {
        await activate({ id: withdrawalId });
        onClick?.(event);
    };

    return (
        <button
            title="Добавить в активные"
            disabled={isLoading || disabled}
            onClick={onClickHandler}
            className={cn(
                "transition-all duration-150 enabled:text-blue-600 enabled:hover:scale-125 enabled:hover:text-blue-500 disabled:cursor-wait disabled:text-blue-400",
                className
            )}
            {...props}
        >
            <FaFileCirclePlus className="text-2xl" />
            <span className="sr-only">Активировать заявку на вывод</span>
        </button>
    );
};
