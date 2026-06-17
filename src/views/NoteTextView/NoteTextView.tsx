import { useNavigate, useParams, type NavigateFunction } from "react-router";
import Editor from "../../components/Editor/Editor";
import type { Note } from "../../shared/types/note";
import { useEffect, useState } from "react";
import { getToken } from "../../utils/authService";
import { refreshTokens } from "../../utils/refreshTokens";

export default function NoteTextView() {
    let accessToken = getToken();

    const navigate: NavigateFunction = useNavigate();
    const [note, setNote] = useState<Note | undefined>(undefined);
    const { noteId } = useParams();

    useEffect(() => {
        async function getNote(noteId :string) {
            try {
                let response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (response.status === 401) {
                    await refreshTokens(navigate);
                    
                    accessToken = getToken();
                    response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });
                }

                const data: Note = await response.json();
                setNote(data);
            } catch(error) {
                console.error(error);
            }
        }
    
        if (noteId) {
            getNote(noteId);
        }
    }, []);

    return(
        <>
            { !note && <p>Loading...</p> }
            { note && <Editor note={note} /> }
        </>
    )
}