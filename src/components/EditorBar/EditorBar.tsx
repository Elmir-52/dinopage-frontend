import { Link, useNavigate, useParams } from "react-router";
import './EditorBar.scss';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { getToken } from "../../utils/authService";
import { refreshTokens } from "../../utils/refreshTokens";
import { HttpError } from "../../errors/httpError";
import type { UpdateNote } from "../../shared/types/note";
import type { EditorState } from "lexical";
import Modal from "../Modal/Modal";
import { useState } from "react";

interface EditorBarProps {
    noteTitleInputRef: React.RefObject<HTMLInputElement | null>
}

export default function EditorBar({ noteTitleInputRef }: EditorBarProps) {
    const [editor] = useLexicalComposerContext();
    const { noteId } = useParams();
    const navigate = useNavigate();
    const [modalState, setModalState] = useState<boolean>(false);

    let accessToken = getToken();

    async function saveNote() {
        let noteTitle: string | undefined = noteTitleInputRef.current?.value;

        const editorState: EditorState = editor.getEditorState();
        const noteContent: string = JSON.stringify(editorState.toJSON());

        const updateNote: UpdateNote = {
            title: noteTitle ? noteTitle : '',
            content: noteContent,
        }

        try {
            let response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateNote),
            });
    
            if (response.status === 401) {
                await refreshTokens();
                
                accessToken = getToken();
                response = await fetch(`http://localhost:3000/notes`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateNote),
                });
            }

            navigate('/');
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    navigate('/login');
                }
            }
        }
    }

    async function deleteNote() {
        try {
            let response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
    
            if (response.status === 401) {
                await refreshTokens();
                
                accessToken = getToken();
                response = await fetch(`http://localhost:3000/notes`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
            }

            navigate('/');
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    navigate('/login');
                }
            }
        }
    }

    return (
        <div className='editor-bar'>
            <div className="editor-bar__buttons-wrapper">
                <Link to='/' className="editor-bar__action">
                    <img src="/dino (1).png" alt="Dino logo" title="Go to home"/> 
                    Home
                </Link>

                <button className="editor-bar__action" onClick={saveNote}>
                    <img 
                        src="/save-logo.png" 
                        alt="Save logo" 
                        title="Source: https://www.flaticon.com/ru/free-icon/diskette_561139"
                    />
                    Save
                </button>

                <button className="editor-bar__action" onClick={() => setModalState(true)}>
                    <img 
                        src="/musorka.png" 
                        alt="Save logo" 
                        title="Source: https://www.flaticon.com/ru/free-icon/bin_9713380?term=%D0%BC%D1%83%D1%81%D0%BE%D1%80%D0%BA%D0%B0&page=1&position=9&origin=search&related_id=9713380"
                    />
                    Delete
                </button>

                <Modal 
                    message="Do you want to delete your note?"
                    stateModal={modalState}
                    setStateModal={setModalState}
                    onClick={deleteNote}
                />
            </div>
        </div>
    );
}