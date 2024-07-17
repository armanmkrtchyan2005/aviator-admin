import { useToggleRequisiteReceiptVerificationMutation } from "@/entities/requisite";
import { handleErrorResponse } from "@/shared/lib/helpers";

import { Switch } from "@/shared/ui/switch/switch";

interface ToggleVerificationReceiptProps
    extends React.ComponentProps<"button"> {
    requisiteId: string;
}

export const ToggleVerificationReceipt: React.FC<
    ToggleVerificationReceiptProps
> = ({ requisiteId, ...props }) => {
    const [toggleReceiptVerification, { isLoading }] =
        useToggleRequisiteReceiptVerificationMutation();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        try {
            await toggleReceiptVerification({ id: requisiteId }).unwrap();
        } catch (error) {
            handleErrorResponse(error, message => alert(message));
        }
    };

    return (
        <Switch
            title="Сменить статус верификации квитанции об оплате"
            disabled={isLoading}
            onClick={onClickHandler}
            className="disabled:cursor-not-allowed"
            {...props}
        />
    );
};
