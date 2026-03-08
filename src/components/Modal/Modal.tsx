import { useCallback, useEffect, useRef } from "react";
import './_Modal.scss'
import { setDb } from "../../fetchRequestDB";
import type { NoteDb } from "../../App";
import { ref, type DatabaseReference } from "firebase/database";
import { db } from "../../../lib/fierbase";
import Button from "../Button/Button";

interface PropsModal {
    open: boolean,
    onClick: (open: boolean) => void,
}

class Note {
    note_id: string;
    user_id: string;
    title: string;
    content: string;
    date: string;

    constructor(note_id: string, user_id: string, title: string, content: string, date: string) {
        this.note_id = note_id;
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.date = date;
    }
}

export default function Modal({ open, onClick }: PropsModal) {
    const dialog = useRef<HTMLDialogElement>(null);

    const cookieFull: string = document.cookie;
    const cookieUserId: string = cookieFull.split('=')[1];

    useEffect(() => {
        if (open) {
            dialog.current?.showModal();
        } else {
            dialog.current?.close();
        }
    });

    
    const noteAdd = useCallback<() => void>(() => {
        const arrayOfNumbersForNewNoteId: BigUint64Array<ArrayBuffer> = crypto.getRandomValues(new BigUint64Array(2));
        const newNoteId: string = `${arrayOfNumbersForNewNoteId[0].toString(36).padStart(13, '0')}-${arrayOfNumbersForNewNoteId[1].toString(36).padStart(13, '0')}`;
        console.log(newNoteId);

        const newNoteRef: DatabaseReference = ref(db, `/notes/${newNoteId}`);
        
        const newDate = new Date();
        const todayDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;

        setDb<NoteDb>(newNoteRef, new Note(newNoteId, cookieUserId, 'Новая заметка', '', todayDate));
    }, []);

    return (
        <dialog ref={dialog} className="modal">
            <Button className="modal__button" onClick={ () => { noteAdd(); onClick(false) } }>Создать новую заметку</Button>
            <Button className="modal__cancel" onClick={ () => onClick(false) }>Отмена</Button>
        </dialog>
    );
}