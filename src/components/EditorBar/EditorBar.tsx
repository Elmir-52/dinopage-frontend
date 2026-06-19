import { Link, useNavigate, useParams } from "react-router";
import './EditorBar.scss';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HttpError } from "../../errors/httpError";
import type { UpdateNote } from "../../shared/types/note";
import type { EditorState } from "lexical";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { requestToBackend } from "../../utils/requestToBackend";
import MessageModal from "../MessageModal/MessageModal";

interface EditorBarProps {
    noteTitleInputRef: React.RefObject<HTMLInputElement | null>
}

export default function EditorBar({ noteTitleInputRef }: EditorBarProps) {
    const [editor] = useLexicalComposerContext();
    const { noteId } = useParams();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
    const [messageModalMessage, setMessageModalMessage] = useState<string>('');

    async function saveNote() {
        let noteTitle: string | undefined = noteTitleInputRef.current?.value;

        const editorState: EditorState = editor.getEditorState();
        const noteContent: string = JSON.stringify(editorState.toJSON());

        const updateNote: UpdateNote = {
            title: noteTitle ? noteTitle : '',
            content: noteContent,
        }

        try {
            const response = await requestToBackend<UpdateNote>({
                url: `http://localhost:3000/notes/${noteId}`,
                method: 'PATCH',
                body: updateNote
            });

            if (!response.ok) throw new Error();

            navigate('/');
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    setMessageModalMessage("Unauthorized: the note hasn't been saved");
                    setIsMessageModalOpen(true);
                    return;
                }
            }

            setMessageModalMessage("The note hasn't been saved, save the note locally to your device, and try again later");
            setIsMessageModalOpen(true);
        }
    }

    async function deleteNote() {
        try {
            const response = await requestToBackend({
                url: `http://localhost:3000/notes/${noteId}`,
                method: 'DELETE'
            });

            if (!response.ok) throw new Error();

            if (response.ok) navigate('/');
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    navigate('/login');
                    return;
                }
            }

            setMessageModalMessage("The note hasn't been deleted, please try again later");
            setIsMessageModalOpen(true);
        }
    }

    return (
        <div className='editor-bar'>
            <div className="editor-bar__buttons-wrapper">
                <Link to='/' className="editor-bar__action">
                    <img src="/dino.png" alt="Dino logo" title="Go to home"/> 
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

                <button className="editor-bar__action" onClick={() => setIsModalOpen(true)}>
                    <img 
                        src="/musorka.png" 
                        alt="Save logo" 
                        title="Source: https://www.flaticon.com/ru/free-icon/bin_9713380?term=%D0%BC%D1%83%D1%81%D0%BE%D1%80%D0%BA%D0%B0&page=1&position=9&origin=search&related_id=9713380"
                    />
                    Delete
                </button>

                <Modal 
                    message="Do you want to delete your note?"
                    isModalOpen={isModalOpen}    
                    setIsModalOpen={(open: boolean) => setIsModalOpen(open)}
                    onClick={() => deleteNote()}
                />

                <MessageModal
                    message={messageModalMessage}
                    isMessageModalOpen={isMessageModalOpen}
                    setIsMessageModalOpen={(open: boolean) => setIsMessageModalOpen(open)}
                />
            </div>
        </div>
    );
}