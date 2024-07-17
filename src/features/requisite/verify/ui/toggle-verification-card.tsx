import { useToggleRequisiteCardVerificationMutation } from "@/entities/requisite";
import { handleErrorResponse } from "@/shared/lib/helpers";

import { Switch } from "@/shared/ui/switch/switch";

interface ToggleVerificationCardProps extends React.ComponentProps<"button"> {
    requisiteId: string;
}

export const ToggleVerificationCard: React.FC<ToggleVerificationCardProps> = ({
    requisiteId,
    ...props
}) => {
    const [toggleCardVerification, { isLoading }] =
        useToggleRequisiteCardVerificationMutation();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        try {
            await toggleCardVerification({ id: requisiteId }).unwrap();
        } catch (error) {
            handleErrorResponse(error, message => alert(message));
        }
    };

    return (
        <Switch
            title="Сменить статус верификации кредитной карты"
            disabled={isLoading}
            onClick={onClickHandler}
            className="disabled:cursor-not-allowed"
            {...props}
        />
    );
};
