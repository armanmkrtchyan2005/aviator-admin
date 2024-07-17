import { Link } from "react-router-dom";

import { FaFileCircleCheck, FaFileCircleXmark } from "react-icons/fa6";

interface ReplenishmentActionButtonProps {
    replenishmentId: string;
}

export const ReplenishmentActionButton: React.FC<
    ReplenishmentActionButtonProps
> = ({ replenishmentId }) => {
    return (
        <div className="flex justify-center gap-x-2">
            <Link
                to={`/replenishment/${replenishmentId}/confirm`}
                title="Подтвердить заявку на пополнение"
                replace={true}
                className="text-lime-600 transition-all duration-150 hover:scale-125 hover:text-lime-500"
            >
                <FaFileCircleCheck className="text-2xl" />
                <span className="sr-only">Подтвердить заявку на вывод</span>
            </Link>

            <Link
                to={`/replenishment/${replenishmentId}/cancel`}
                title="Отменить заявку на пополнение"
                replace={true}
                className="text-red-600 transition-all duration-150 hover:scale-125 hover:text-red-500"
            >
                <FaFileCircleXmark className="text-2xl" />
                <span className="sr-only">Отменить заявку на вывод</span>
            </Link>
        </div>
    );
};
