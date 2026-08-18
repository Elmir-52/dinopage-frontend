'use client'

import { useEffect, useState } from "react";
import { ErrorDialogOnClick, ErrorDialogState } from "./errorDialog";

export function useErrorDialogModel(
    error: Error | undefined,
    onClick?: ErrorDialogOnClick
) {
    const [errorDialogState, setErrorDialogState] = useState<ErrorDialogState>({
        isOpen: false,
        message: '',
        onClick
    });

    useEffect(() => {
        if (error) {
            setErrorDialogState(prev => ({
                isOpen: true,
                message: error.message,
                onClick: prev.onClick
            }));
        }
    }, [error]);

    function toggleIsOpen(isOpen: boolean) {
        setErrorDialogState(prev => ({ 
            ...prev, 
            isOpen
        }));
    }

    return {
        errorDialogState,
        toggleIsOpen,
    }
}