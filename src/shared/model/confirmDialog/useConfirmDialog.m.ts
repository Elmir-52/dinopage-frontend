'use client'

import { useState } from "react";
import { ConfirmDialogOnClick, ConfirmDialogState } from "./confirmDialog";

export function useConfirmDialogModel(
    message: string,
    onClick: ConfirmDialogOnClick,
) {
    const [confirmDialogState, setConfirmDialogState] = useState<ConfirmDialogState>({
        isOpen: false,
        message,
        onClick
    });

    function toggleIsOpen(isOpen: boolean) {
        setConfirmDialogState(prev => ({ 
            ...prev, 
            isOpen
        }));
    }

    return {
        confirmDialogState,
        toggleIsOpen,
    }
}