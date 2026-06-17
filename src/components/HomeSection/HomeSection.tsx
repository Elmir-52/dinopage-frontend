import { useCallback, useEffect, useState  } from "react";
import NoteCard from "../NoteCard/NoteCard";
import ButtonNoteAdd from "../CreateNoteButton/CreateNoteButton";
import './HomeSection.scss';
import Modal from "../Modal/Modal";
import type { CreateNote, Note } from "../../shared/types/note";
import { NOTE_CARD_BACKGROUNDS } from "../../shared/data/noteCardBackgrounds";
import { randomColor } from "../../utils/randomColor";
import { getToken } from "../../utils/authService";
import { refreshTokens } from "../../utils/refreshTokens";
import { useNavigate, type NavigateFunction } from "react-router";
import { HttpError } from "../../errors/httpError";

export default function HomeSection() {
    let accessToken = getToken();

    const navigate: NavigateFunction = useNavigate();
    const [stateModal, setStateModal] = useState<boolean>(false);
    const [rerender, setRerender] = useState<boolean>(false);
    const [result, setResult] = useState<Note[] | undefined>();

    useEffect(() => {
        async function getUserNotes() {
            try {
                let response = await fetch(`http://localhost:3000/notes`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (response.status === 401) {
                    await refreshTokens();
                    
                    accessToken = getToken();
                    response = await fetch(`http://localhost:3000/notes`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });
                }

                const notes: Note[] = await response.json();
                setResult(notes);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        navigate('/login');
                    }
                }
            }
        }

        getUserNotes();
    }, [rerender]);

    const createNote = useCallback<() => void>(async () => {
        const newNote: CreateNote = {
            title: '',
            content: '',
            color: randomColor(0, NOTE_CARD_BACKGROUNDS.length - 1),
        }
        
        try {
            let response = await fetch('http://localhost:3000/notes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            });

            if (response.status === 401) {
                await refreshTokens();
                    
                accessToken = getToken();
                response = await fetch('http://localhost:3000/notes', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newNote),
                });
            }

            setRerender(prev => !prev);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    navigate('/login');
                }
            }
        }
    }, []);

        
    return (
        <section className="home-section">
            {
                result?.map(el => {
                    return <NoteCard key={el.noteId} content={el}></NoteCard>
                })
            }

            <ButtonNoteAdd onClick={(open: boolean) => setStateModal(open)} ></ButtonNoteAdd>
            <Modal
                message='Create new note'
                stateModal={stateModal}
                setStateModal={(open: boolean) => setStateModal(open)}
                onClick={() => createNote()}
            ></Modal>
        </section>
    );
}