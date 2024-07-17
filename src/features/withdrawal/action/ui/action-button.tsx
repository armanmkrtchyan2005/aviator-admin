import { Link } from "react-router-dom";

import { useFetchUserInfoQuery } from "@/entities/user";

import { AddToActiveListButton } from "./add-to-active-list-button";

import { FaFileCircleCheck, FaFileCircleXmark } from "react-icons/fa6";

interface WithdrawalActionButtonProps {
    withdrawalId: string;
    activeUserId: string;
}

export const WithdrawalActionButton: React.FC<WithdrawalActionButtonProps> = ({
    withdrawalId,
    activeUserId
}) => {
    const { data: user } = useFetchUserInfoQuery();

    if (activeUserId === user?._id)
        return (
            <div className="flex justify-center gap-x-2">
                <Link
                    to={`/withdrawal/${withdrawalId}/confirm`}
                    title="Подтвердить заявку на вывод"
                    replace={true}
                    className="text-lime-600 transition-all duration-150 hover:scale-125 hover:text-lime-500"
                >
                    <FaFileCircleCheck className="text-2xl" />
                    <span className="sr-only">Подтвердить заявку на вывод</span>
                </Link>

                <Link
                    to={`/withdrawal/${withdrawalId}/cancel`}
                    title="Отменить заявку на вывод"
                    replace={true}
                    className="text-red-600 transition-all duration-150 hover:scale-125 hover:text-red-500"
                >
                    <FaFileCircleXmark className="text-2xl" />
                    <span className="sr-only">Отменить заявку на вывод</span>
                </Link>
            </div>
        );

    return <AddToActiveListButton withdrawalId={withdrawalId} />;
};
