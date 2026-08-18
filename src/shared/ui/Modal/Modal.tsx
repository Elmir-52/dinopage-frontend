'use client'

import React, { useEffect, useRef } from "react";
import { Portal } from "../Portal/Portal";

interface ModalProps {
    isOpen: boolean,
    children: React.ReactNode
}

export function Modal({ isOpen, children }: ModalProps) {
    const dialog = useRef<HTMLDialogElement>(null);
    
    useEffect(() => {
        if (isOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isOpen]);

    return (
        <Portal>
            <dialog 
                className="m-auto bg-transparent rounded-3xl shadow-2xl"
                ref={dialog}
            >
                {children}
            </dialog>
        </Portal>
    )
}