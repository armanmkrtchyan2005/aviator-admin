import {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
    useMemo
} from "react";
import { Portal, PortalElement } from "../portal";
import {
    AlertDialogContext,
    useAlertDialogContext
} from "./use-alert-dialog-context";
import { useOutsideClick } from "../../lib/hooks/use-outside-click";

import { cn } from "@/shared/lib/tailwind-merge";
import { buttonVariants } from "../button";
import { VariantProps } from "class-variance-authority";

interface AlertDialogProps {
    modal?: boolean;
    children: React.ReactNode;
}

interface AlertDialogComposition {
    Trigger: React.FC<AlertDialogTriggerProps>;
    Action: React.FC<AlertDialogActionProps>;
    Cancel: React.FC<AlertDialogCancelProps>;
    Portal: React.FC<PortalElement<HTMLDialogElement>>;
    Title: React.FC<AlertDialogTitle>;
    Content: React.ForwardRefExoticComponent<
        AlertDialogContentElement & React.RefAttributes<AlertDialogContentProps>
    >;
    // Close: React.FC<AlertDialogCloseProps>;
}

export const AlertDialog: React.FC<AlertDialogProps> &
    AlertDialogComposition = ({ modal = true, children }) => {
    const alertDialogRef = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);

    const memoizedContext = useMemo(
        () => ({ modal, alertDialogRef, open, setOpen }),
        [modal, open]
    );

    return (
        <AlertDialogContext.Provider value={memoizedContext}>
            {children}
        </AlertDialogContext.Provider>
    );
};

export interface AlertDialogContentProps
    extends React.ComponentProps<"dialog"> {
    show: () => void;
    showModal: () => void;
    close: () => void;
}

interface AlertDialogContentElement
    extends React.DialogHTMLAttributes<HTMLDialogElement> {}

const AlertDialogContent = forwardRef<
    AlertDialogContentProps,
    AlertDialogContentElement
>(({ className, onClose, children, ...props }, ref) => {
    const contentRef = useRef<HTMLElement>(null);
    const { open, setOpen, modal, alertDialogRef } = useAlertDialogContext();
    useOutsideClick(contentRef, () => setOpen(false), { capture: true });

    useEffect(() => {
        if (open) {
            if (modal) {
                alertDialogRef.current?.showModal();
            } else {
                alertDialogRef.current?.show();
            }
        } else {
            alertDialogRef.current?.close();
        }
    }, [open, modal, alertDialogRef]);

    useImperativeHandle(
        ref,
        () => ({
            show: () => setOpen(true),
            showModal: () => setOpen(true),
            close: () => alertDialogRef.current?.close()
        }),
        [alertDialogRef, setOpen]
    );

    const onCloseHandler: React.ReactEventHandler<
        HTMLDialogElement
    > = event => {
        onClose?.(event);
        setOpen(false);
    };

    return (
        <>
            {open ? (
                <dialog
                    className="fixed left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 bg-transparent bg-opacity-0"
                    // style={{ all: "unset" }}
                    onClose={onCloseHandler}
                    ref={alertDialogRef}
                    {...props}
                >
                    <section
                        ref={contentRef}
                        className={cn(
                            "space-y-3 rounded-lg bg-white px-3 py-2 shadow-xl",
                            className
                        )}
                    >
                        {children}
                    </section>
                </dialog>
            ) : null}
        </>
    );
});

AlertDialog.Content = AlertDialogContent;

AlertDialog.Portal = Portal;

interface AlertDialogTriggerProps extends React.ComponentProps<"button"> {}

const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({
    className,
    onClick,
    ...props
}) => {
    const { setOpen } = useAlertDialogContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        setOpen(true);
        onClick?.(event);
    };

    return (
        <button
            className={(cn(""), className)}
            onClick={onClickHandler}
            {...props}
        />
    );
};

AlertDialog.Trigger = AlertDialogTrigger;

interface AlertDialogActionProps
    extends React.ComponentProps<"button">,
        VariantProps<typeof buttonVariants> {}

const AlertDialogAction: React.FC<AlertDialogActionProps> = ({
    className,
    variant,
    onClick,
    ...props
}) => {
    const { alertDialogRef } = useAlertDialogContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = async event => {
        await onClick?.(event);

        alertDialogRef.current?.close();
    };

    return (
        <button
            onClick={onClickHandler}
            className={cn(
                buttonVariants({ variant: variant || "success", className })
            )}
            {...props}
        />
    );
};

AlertDialog.Action = AlertDialogAction;

interface AlertDialogCancelProps
    extends React.ComponentProps<"button">,
        VariantProps<typeof buttonVariants> {}

const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({
    className,
    variant,
    onClick,
    ...props
}) => {
    const { alertDialogRef } = useAlertDialogContext();

    const onClickHandler: React.MouseEventHandler<
        HTMLButtonElement
    > = event => {
        onClick?.(event);
        alertDialogRef.current?.close();
    };

    return (
        <button
            onClick={onClickHandler}
            className={cn(
                buttonVariants({ variant: variant || "danger", className })
            )}
            {...props}
        />
    );
};

AlertDialog.Cancel = AlertDialogCancel;

interface AlertDialogTitle extends React.ComponentProps<"header"> {}

const AlertDialogTitle: React.FC<AlertDialogTitle> = ({
    className,
    ...props
}) => {
    return (
        <header
            className={cn(
                "text-balance text-center text-lg font-medium",
                className
            )}
            {...props}
        />
    );
};

AlertDialog.Title = AlertDialogTitle;
