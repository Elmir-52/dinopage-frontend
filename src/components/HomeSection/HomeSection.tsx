import { useCallback, useEffect, useState  } from "react";
import ButtonNote from "../ButtonNote/ButtonNote";
import ButtonNoteAdd from "../ButtonNoteAdd/ButtonNoteAdd";
import './_HomeSection.scss';
import Modal from "../Modal/Modal";
import { getDb, setDb } from "../../fetchRequestDB";
import type { NoteDb } from "../../App";
import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from "firebase/database";
import { db } from "../../../lib/fierbase";

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

export default function HomeSection() {
    const [stateModal, setStateModal] = useState<boolean>(false);
    const [result, setResult] = useState<NoteDb[] | undefined>();
    
    const cookieFull: string = document.cookie;
    const cookieUserId: string = cookieFull.split('=')[1];

    const notesRef: DatabaseReference = ref(db, '/notes');
    const notesQuery: Query = query(
        notesRef,
        orderByChild('user_id'),
        equalTo(cookieUserId)
    )

    useEffect(() => {
        getDb<NoteDb>(notesQuery)
            .then((data: NoteDb[] | undefined) => { setResult(data) })
    }, [stateModal]);

    const noteAdd = useCallback<() => void>(() => {
        const arrayOfNumbersForNewNoteId: BigUint64Array<ArrayBuffer> = crypto.getRandomValues(new BigUint64Array(2));
        const newNoteId: string = `${arrayOfNumbersForNewNoteId[0].toString(36).padStart(13, '0')}-${arrayOfNumbersForNewNoteId[1].toString(36).padStart(13, '0')}`;

        const newNoteRef: DatabaseReference = ref(db, `/notes/${newNoteId}`);
        
        const newDate = new Date();
        const todayDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;

        setDb<NoteDb>(newNoteRef, new Note(newNoteId, cookieUserId, 'Новая заметка', '', todayDate));
    }, []);
        
    return (
        <section className="home-section">

            {
                result?.map(el => {
                    return <ButtonNote key={el.note_id} content={el}></ButtonNote>
                })
            }

            <ButtonNoteAdd onClick={(open: boolean) => setStateModal(open)} ></ButtonNoteAdd>
            <Modal
                message={'Создать новую заметку'}
                stateModal={stateModal}
                setStateModal={(open: boolean) => setStateModal(open)}
                onClick={() => noteAdd()}
            ></Modal>
        </section>
    );
}