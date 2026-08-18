'use client'


import { useEffect, useRef } from "react";
import { ErrorDialogOnClick } from "../../model/errorDialog/errorDialog";

interface ErrorDialogProps {
    message: string
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    onClick?: ErrorDialogOnClick;
}

export function ErrorDialog({ 
    message,
    isOpen, 
    setIsOpen,
    onClick
}: ErrorDialogProps) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={dialog} className="open:flex flex-col justify-between items-center w-100 
        m-auto pt-7.5 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl">
            <p className="w-[80%] text-center text-2xl mb-7.5">{message}</p>
            
            <button 
                className="w-full text-green-700 text-xl cursor-pointer p-2 border-t 
                border-solid border-gray-500 font-semibold"
                onClick={() => {
                    if (onClick) {
                        onClick();
                    }
                    setIsOpen(false);
                }}
            >
                Ok
            </button>
        </dialog>
    );
}