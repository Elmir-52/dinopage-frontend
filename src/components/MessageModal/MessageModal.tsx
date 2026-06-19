import { useEffect, useRef } from "react";
import './MessageModal.scss';

export type MessageModalOnClick = () => void;

interface MessageModalProps {
    message: string
    isMessageModalOpen: boolean,
    setIsMessageModalOpen: (open: boolean) => void,
    onClick?: MessageModalOnClick;
}

export default function MessageModal({ 
    message, 
    isMessageModalOpen, 
    setIsMessageModalOpen,
    onClick
}: MessageModalProps) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isMessageModalOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isMessageModalOpen]);

    return (
        <dialog ref={dialog} className="message-modal">
            <p className="message-modal__message">{message}</p>
            
            <button 
                className="message-modal__button" 
                onClick={() => {
                    if (onClick) {
                        onClick();
                    }
                    setIsMessageModalOpen(false);
                }}
            >
                Ok
            </button>
        </dialog>
    );
}