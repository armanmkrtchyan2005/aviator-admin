import { useToggleRequisiteStatusMutation } from "@/entities/requisite";
import { handleErrorResponse } from "@/shared/lib/helpers";
import { Switch } from "@/shared/ui/switch/switch";

interface SwitchRequisiteStatusProps extends React.ComponentProps<"button"> {
    requisiteId: string;
}

export const SwitchRequisiteStatus: React.FC<SwitchRequisiteStatusProps> = ({
    requisiteId,
    ...props
}) => {
    const [toggleStatus, { isLoading }] = useToggleRequisiteStatusMutation();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async event => {
        const button = event.currentTarget;
        const checked = button.getAttribute("aria-checked") === "true";

        try {
            await toggleStatus({ id: requisiteId }).unwrap();
            button.setAttribute("aria-checked", String(!checked));
        } catch (error) {
            handleErrorResponse(error, message => alert(message));
        }
    };

    return (
        <Switch
            onClick={onClickHandler}
            disabled={isLoading}
            className="disabled:cursor-not-allowed"
            {...props}
        />
    );
};
