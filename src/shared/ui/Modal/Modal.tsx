'use client'

import { useEffect, useRef } from "react";

interface PropsModal {
    message: string
    isModalOpen: boolean,
    setIsModalOpen: (open: boolean) => void,
    onClick: () => void;
}

export function Modal({ message, isModalOpen, setIsModalOpen, onClick }: PropsModal) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isModalOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isModalOpen]);

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
                    onClick={ () => setIsModalOpen(false) }
                >
                    No
                </button>
                
                <button 
                    className="w-[50%] text-green-700 text-xl cursor-pointer p-2.5 
                    border-t border-l border-solid border-gray-500 font-semibold" 
                    onClick={ () => { onClick(); setIsModalOpen(false); }}
                >
                    Yes
                </button>
            </div>
        </dialog>
    );
}