'use client'

import { ConfirmDialogOnClick } from "../../model/confirmDialog/confirmDialog";
import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
    message: string
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    onClick: ConfirmDialogOnClick;
}

export function ConfirmDialog({ message, isOpen, setIsOpen, onClick }: ConfirmDialogProps) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog 
            ref={dialog} 
            className="open:flex flex-col justify-between items-center w-80 m-auto pt-7.5 rounded-3xl 
            bg-white/10 backdrop-blur-md shadow-2xl"
        >
            <p className="w-[80%] text-center text-2xl mb-7.5">{message}</p>
            
            <div className="flex justify-between items-center w-full">
                <button 
                    className="w-[50%] text-red-600 text-xl cursor-pointer p-2.5 
                    border-t border-solid border-gray-500 font-semibold" 
                    onClick={ () => setIsOpen(false) }
                >
                    No
                </button>
                
                <button 
                    className="w-[50%] text-green-700 text-xl cursor-pointer p-2.5 
                    border-t border-l border-solid border-gray-500 font-semibold" 
                    onClick={ () => { onClick(); setIsOpen(false); }}
                >
                    Yes
                </button>
            </div>
        </dialog>
    );
}