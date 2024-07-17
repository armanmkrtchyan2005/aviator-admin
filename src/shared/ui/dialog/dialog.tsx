import { useRef } from "react";
import { Portal, PortalElement } from "../portal";
import { DialogContext, useDialogContext } from "./use-dialog-context";

import { cn } from "@/shared/lib/tailwind-merge";

import { IoCloseSharp } from "react-icons/io5";

interface DialogProps {
    children: React.ReactNode;
}

interface PopoverComposition {
    Trigger: React.FC<DialogTriggerProps>;
    Portal: React.FC<PortalElement<HTMLDialogElement>>;
    Content: React.FC<DialogContentProps>;
    Close: React.FC<DialogCloseProps>;
}

export const Dialog: React.FC<DialogProps> & PopoverComposition = ({
    children
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
        <DialogContext.Provider value={{ dialogRef }}>
            {children}
        </DialogContext.Provider>
    );
};

interface DialogTriggerProps extends React.ComponentProps<"button"> {}

const DialogTrigger: React.FC<DialogTriggerProps> = ({
    children,
    onClick,
    ...props
}) => {
    const { dialogRef } = useDialogContext();

    const handleTriggerClick: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        onClick?.(event);
        const dialog = dialogRef.current;
        const isOpen = dialog?.hasAttribute("open");

        if (!isOpen) {
            event.stopPropagation();
            dialog?.show();
            document.addEventListener("click", handleOutsideClick);
        }
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (!dialogRef.current) return;

        const rect = dialogRef.current.getBoundingClientRect();
        const isInDialog =
            rect.top <= event.clientY &&
            event.clientY <= rect.bottom &&
            rect.left <= event.clientX &&
            event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
            dialogRef.current.close();
            document.removeEventListener("click", handleOutsideClick);
        }
    };

    return (
        <button
            {...props}
            onClick={handleTriggerClick}
        >
            {children}
        </button>
    );
};

Dialog.Trigger = DialogTrigger;

Dialog.Portal = Portal;

interface DialogContentProps extends React.ComponentPropsWithoutRef<"dialog"> {}

const DialogContent: React.FC<DialogContentProps> = ({
    className,
    children,
    ...props
}) => {
    const { dialogRef } = useDialogContext();

    return (
        <dialog
            {...props}
            ref={dialogRef}
            className={cn(
                "fixed inset-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg",
                className
            )}
        >
            {children}
        </dialog>
    );
};

Dialog.Content = DialogContent;

interface DialogCloseProps
    extends Omit<React.ComponentProps<"button">, "children"> {}

const DialogClose: React.FC<DialogCloseProps> = ({
    className,
    onClick,
    ...props
}) => {
    const { dialogRef } = useDialogContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        onClick?.(event);

        dialogRef.current?.close();
    };

    return (
        <button
            onClick={onClickHandler}
            className={cn("absolute right-3 top-3", className)}
            {...props}
        >
            <IoCloseSharp />
            <span className="sr-only">Закрыть диалоговое окно</span>
        </button>
    );
};

Dialog.Close = DialogClose;
