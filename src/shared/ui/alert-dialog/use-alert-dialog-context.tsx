import { createContext, useContext } from "react";

export const AlertDialogContext = createContext<{
    alertDialogRef: React.RefObject<HTMLDialogElement>;
    modal: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useAlertDialogContext = () => {
    const context = useContext(AlertDialogContext);

    if (!context) {
        throw new Error(
            "Component must be rendered as child of alert dialog component"
        );
    }

    return context;
};
