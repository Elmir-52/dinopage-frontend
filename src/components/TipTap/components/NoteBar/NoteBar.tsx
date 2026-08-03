import { useCurrentEditor } from "@tiptap/react"
import { requestToBackend } from "../../../../utils/requestToBackend";
import type { UpdateNote } from "../../../../shared/types/note";
import { Link, useNavigate, useParams, type NavigateFunction } from "react-router";
import { useState } from "react";
import Modal from "../../../Modal/Modal";
import MessageModal from "../../../MessageModal/MessageModal";
import { HttpError } from "../../../../errors/httpError";
import { Save, Trash2 } from "lucide-react";

interface NoteBarProps {
    noteTitleInputRef: React.RefObject<HTMLInputElement | null>
}

export default function NoteBar({ noteTitleInputRef }: NoteBarProps) {
    const { editor } = useCurrentEditor();
    const { noteId } = useParams();
    const navigate: NavigateFunction = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
    const [messageModalMessage, setMessageModalMessage] = useState<string>('');

    async function saveNote() {
        let noteTitle: string | undefined = noteTitleInputRef.current?.value;
        const noteContent: string = JSON.stringify(editor?.getJSON());

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

            navigate('/');
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
        <div className='w-70 h-full p-2.5'>
            <div className="flex flex-col items-start gap-2.5">
                <Link 
                    to='/' 
                    className="flex items-center gap-4 w-full rounded-xl px-2.5 py-1.5 
                    text-xl cursor-pointer hover:bg-gray-200"
                >
                    <img className="w-6.5" src="/dino.png" alt="Dino logo" title="Go to home"/> 
                    Home
                </Link>

                <button 
                    className="flex items-center gap-4 w-full rounded-xl px-2.5 py-1.5 
                    text-xl cursor-pointer hover:bg-gray-200"
                    onClick={saveNote}
                >
                    <Save size={26}/>
                    Save
                </button>

                <button 
                    className="flex items-center gap-4 w-full rounded-xl px-2.5 py-1.5 
                    text-xl cursor-pointer hover:bg-gray-200"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Trash2 size={26} color="#ff0000"/>
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