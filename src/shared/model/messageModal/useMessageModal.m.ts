'use client'

import { useEffect, useState } from "react";
import { MessageModalOnClick, MessageModalState } from "./messageModal";

export function useMessageModalModel(
    error: Error | undefined,
    onClick?: MessageModalOnClick
) {
    const [messageModalState, setMessageModalState] = useState<MessageModalState>({
        isOpen: false,
        message: '',
        onClick
    });

    useEffect(() => {
        if (error) {
            setMessageModalState(prev => ({
                isOpen: true,
                message: error.message,
                onClick: prev.onClick
            }));
        }
    }, [error]);

    function toggleIsMessageModalOpen(isOpen: boolean) {
        setMessageModalState(prev => ({ 
            ...prev, 
            isOpen
        }));
    }

    return {
        messageModalState,
        toggleIsMessageModalOpen,
    }
}