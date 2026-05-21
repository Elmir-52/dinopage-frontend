import { useCallback, useEffect, useState  } from "react";
import NoteCard from "../NoteCard/NoteCard";
import ButtonNoteAdd from "../CreateNoteButton/CreateNoteButton";
import './HomeSection.scss';
import Modal from "../Modal/Modal";
import type { Note } from "../../shared/types/note";
import { NOTE_CARD_BACKGROUNDS } from "../../shared/data/noteCardBackgrounds";

interface HomeSectionProps { 
    userId: string
}

export default function HomeSection({ userId }: HomeSectionProps) {
    const [stateModal, setStateModal] = useState<boolean>(false);
    const [rerender, setRerender] = useState<boolean>(false);
    const [result, setResult] = useState<Note[] | undefined>();

    useEffect(() => {
        async function getUserNotes() {
            try {
                const res = await fetch('http://localhost:3000/api/notes', {
                    headers: {
                        "Authorization": userId,
                    },
                });

                if (res.ok) {
                    const notes: Note[] = await res.json();
                    setResult(notes);
                } else {
                    const message = res.json();
                    throw new Error(`${message}`);
                }
            } catch(error) {
                const err = error as Error;
                console.error(err.message);
            }
        }

        getUserNotes();
    }, [rerender]);

    const createNote = useCallback<() => void>(async () => {
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
            user_id: userId,
            title: 'Новая заметка',
            content: '',
            date: todayDate,
            backgroundColor: randomColor(0, NOTE_CARD_BACKGROUNDS.length - 1),
        }
        
        try {
            const res = await fetch('http://localhost:3000/api/notes/note', {
                method: 'POST',
                body: JSON.stringify(newNote),
            });

            if (res.ok) {
                setRerender(prev => !prev);
            } else {
                const message = res.json();
                throw new Error(`${message}`);
            }
        } catch(error) {
            const err = error as Error;
            console.error(err.message);
        }
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