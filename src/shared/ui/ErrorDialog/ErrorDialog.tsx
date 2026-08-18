'use client'

import { ErrorDialogOnClick } from "../../model/errorDialog/errorDialog";

interface ErrorDialogProps {
    message: string
    setIsOpen: (open: boolean) => void,
    onClick?: ErrorDialogOnClick;
}

export function ErrorDialog({ 
    message,
    setIsOpen,
    onClick
}: ErrorDialogProps) {
    return (
        <div 
            className="flex flex-col justify-between items-center w-100 
            pt-7.5 bg-white/20 backdrop-blur-md"
        >
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
        </div>
    );
}