import { useNavigate } from "react-router-dom";
import { AlertDialog } from "@/shared/ui/alert-dialog";

import { useAppDispatch, logout } from "@/app/providers/redux-provider";

interface LogoutButtonProps extends React.ComponentProps<"button"> {}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
    onClick,
    ...props
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        dispatch(logout());

        onClick?.(event);

        navigate("/login", { replace: true });
    };

    return (
        <AlertDialog>
            <AlertDialog.Trigger
                className="ml-2 cursor-pointer font-semibold text-blue-500"
                {...props}
            >
                Выйти
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Content>
                    <AlertDialog.Title className="font-semibold">
                        Вы действительно хотите выйти?
                    </AlertDialog.Title>
                    <div className="flex items-center justify-evenly">
                        <AlertDialog.Action
                            variant="danger"
                            onClick={onClickHandler}
                        >
                            Да
                        </AlertDialog.Action>
                        <AlertDialog.Cancel variant="success">
                            Нет
                        </AlertDialog.Cancel>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog>
    );
};
