import { useCallback, useEffect, useState  } from "react";
import NoteCard from "../NoteCard/NoteCard";
import ButtonNoteAdd from "../ButtonNoteAdd/ButtonNoteAdd";
import './HomeSection.scss';
import Modal from "../Modal/Modal";
import { getDb, setDb } from "../../fetchRequestDB";
import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from "firebase/database";
import { db } from "../../../lib/fierbase";
import type { Note } from "../../shared/types/note";
import { NOTE_CARD_BACKGROUNDS } from "../../shared/data/noteCardBackgrounds";


export default function HomeSection() {
    const [stateModal, setStateModal] = useState<boolean>(false);
    const [result, setResult] = useState<Note[] | undefined>();
    
    const cookieFull: string = document.cookie;
    const cookieUserId: string = cookieFull.split('=')[1];

    const notesRef: DatabaseReference = ref(db, '/notes');
    const notesQuery: Query = query(
        notesRef,
        orderByChild('user_id'),
        equalTo(cookieUserId)
    );

    useEffect(() => {
        getDb<Note>(notesQuery)
            .then((data: Note[] | undefined) => { setResult(data) })
    }, [stateModal]);

    const createNote = useCallback<() => void>(() => {
        const arrayOfNumbersForNewNoteId: BigUint64Array<ArrayBuffer> = crypto.getRandomValues(new BigUint64Array(2));
        const newNoteId: string = `${arrayOfNumbersForNewNoteId[0].toString(36).padStart(13, '0')}-${arrayOfNumbersForNewNoteId[1].toString(36).padStart(13, '0')}`;
        
        const newDate = new Date();
        const todayDate = `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`;

        function randomColor(min: number, max: number) {
            const index = Math.floor(Math.random() * (max - min + 1)) + min;
            return NOTE_CARD_BACKGROUNDS[index];
        }
        
        const newNote: Note = {
            note_id: newNoteId,
            user_id: cookieUserId,
            title: 'Новая заметка',
            content: '',
            date: todayDate,
            backgroundColor: randomColor(0, NOTE_CARD_BACKGROUNDS.length - 1),
        }
        
        const newNoteRef: DatabaseReference = ref(db, `/notes/${newNoteId}`);
        setDb<Note>(newNoteRef, newNote);
    }, []);
        
    return (
        <section className="home-section">

            {
                result?.map(el => {
                    return <NoteCard key={el.note_id} content={el}></NoteCard>
                })
            }

            <ButtonNoteAdd onClick={(open: boolean) => setStateModal(open)} ></ButtonNoteAdd>
            <Modal
                message={'Создать новую заметку'}
                stateModal={stateModal}
                setStateModal={(open: boolean) => setStateModal(open)}
                onClick={() => createNote()}
            ></Modal>
        </section>
    );
}