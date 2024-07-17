import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as Dialog from "@radix-ui/react-dialog";
import { buttonVariants } from "@/shared/ui/button";

import { AddRequisiteForm } from "./add-requisite-form";

import { CgClose } from "react-icons/cg";

export const AddRequisiteButton = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Dialog.Root
            open={open}
            onOpenChange={setOpen}
            modal={false}
        >
            <Dialog.Trigger className={buttonVariants({ variant: "primary" })}>
                Добавить +
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Content
                    onPointerDownOutside={() => navigate("/requisite")}
                    onEscapeKeyDown={() => navigate("/requisite")}
                    className="fixed left-[50%] top-[50%] isolate z-30 h-max w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 rounded-2xl border border-slate-200 bg-slate-100 p-6 text-white shadow-lg duration-200"
                >
                    <Dialog.Close
                        asChild
                        className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500"
                    >
                        <Link to="/requisite">
                            <CgClose className="text-xl text-black" />
                            <span className="sr-only">Закрыть</span>
                        </Link>
                    </Dialog.Close>

                    <Dialog.Title className="text-balance text-center text-xl font-semibold text-black">
                        Добавить реквизит
                    </Dialog.Title>

                    <AddRequisiteForm setOpen={setOpen} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
