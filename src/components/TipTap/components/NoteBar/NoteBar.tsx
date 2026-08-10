import { useCurrentEditor } from "@tiptap/react"
import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import MessageModal from "@/components/MessageModal/MessageModal";
import { UpdateNote } from "@/shared/types/note";
import { requestToBackend } from "@/utils/requestToBackend";
import { HttpError } from "@/errors/httpError";
import Modal from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Paths } from "@/shared/enums/paths.enum";

interface NoteBarProps {
    noteTitleInputRef: React.RefObject<HTMLInputElement | null>
}

export default function NoteBar({ noteTitleInputRef }: NoteBarProps) {
    const { editor } = useCurrentEditor();
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
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
                url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
                method: 'PATCH',
                body: updateNote
            });

            if (!response.ok) throw new Error();

            router.push(Paths.DOCS);
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
                url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
                method: 'DELETE'
            });

            if (!response.ok) throw new Error();

            router.push(Paths.DOCS);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    router.push(Paths.LOGIN);
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
                    href={Paths.DOCS}
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