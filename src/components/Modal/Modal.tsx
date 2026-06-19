import { useEffect, useRef } from "react";
import './Modal.scss'

interface PropsModal {
    message: string
    isModalOpen: boolean,
    setIsModalOpen: (open: boolean) => void,
    onClick: () => void;
}

export default function Modal({ message, isModalOpen, setIsModalOpen, onClick }: PropsModal) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isModalOpen) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    }, [isModalOpen]);

    return (
        <dialog ref={dialog} className="modal">
            <p className="modal__message" >{message}</p>
            <div className="modal__buttons">
                <button 
                    className="modal__cancel" 
                    onClick={ () => setIsModalOpen(false) }
                >
                    No
                </button>
                
                <button 
                    className="modal__execute" 
                    onClick={ () => { onClick(); setIsModalOpen(false); }}
                >
                    Yes
                </button>
            </div>
        </dialog>
    );
}