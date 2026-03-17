import { useRef } from "react";
import './_Modal.scss'

interface PropsModal {
    message: string
    stateModal: boolean,
    setStateModal: (open: boolean) => void,
    onClick: () => void;
}

export default function Modal({ message, stateModal, setStateModal, onClick }: PropsModal) {
    const dialog = useRef<HTMLDialogElement>(null);

    if (stateModal) {
        dialog.current?.showModal();
    } else {
        dialog.current?.close();
    }

    return (
        <dialog ref={dialog} className="modal">
            <p className="modal__message" >{message}</p>
            <div className="modal__buttons">
                <button className="modal__cancel" onClick={ () => setStateModal(false) }>Отмена</button>
                <button className="modal__execute" onClick={ () => { onClick(); setStateModal(false) } }>Выполнить</button>
            </div>
        </dialog>
    );
}