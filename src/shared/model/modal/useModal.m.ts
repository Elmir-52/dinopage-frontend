'use client'

import { ModalOnClick, ModalState } from "@/shared/model";
import { useState } from "react";

export function useModalModel(
    message: string,
    onClick: ModalOnClick,
) {
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        message,
        onClick
    });

    function toggleIsModalOpen(isOpen: boolean) {
        setModalState(prev => ({ 
            ...prev, 
            isOpen
        }));
    }

    return {
        modalState,
        toggleIsModalOpen,
    }
}