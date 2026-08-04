import { useNavigate, useParams, type NavigateFunction } from "react-router";
import type { Note } from "../../shared/types/note";
import { useEffect, useState } from "react";
import { requestToBackend } from "../../utils/requestToBackend";
import { HttpError } from "../../errors/httpError";
import TipTap from "../../components/TipTap/TipTap";

export default function NoteTextView() {
    const navigate: NavigateFunction = useNavigate();
    const [note, setNote] = useState<Note | undefined>(undefined);
    const { noteId } = useParams();

    useEffect(() => {
        async function getNote(noteId :string) {
            try {
                let response = await requestToBackend({
                    url: `http://localhost:3000/notes/${noteId}`,
                    method: 'GET'
                });

                if (!response.ok) {
                    navigate('/');
                    return;
                }

                const data: Note = await response.json();
                setNote(data);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        navigate('/login');
                        return;
                    }
                }
            }
        }
    
        if (noteId) {
            getNote(noteId);
        }
    }, []);

    return(
        <>
            {!note && <p>Loading...</p>}
            {note && <TipTap note={note}/>}
        </>
    )
}