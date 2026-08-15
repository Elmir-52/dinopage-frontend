import { useCurrentEditor } from "@tiptap/react"
import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import MessageModal from "@/components/MessageModal/MessageModal";
import { UpdateNote } from "@/shared/types/note";
import Modal from "@/components/Modal/Modal";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Paths } from "@/shared/enums/paths.enum";
import { MessageModalState } from "@/components/MessageModal/MessageModal.types";
import { baseRequest, HttpError } from "@/shared/api";

interface NoteBarProps {
    noteTitleInputRef: React.RefObject<HTMLInputElement | null>
}

export default function NoteBar({ noteTitleInputRef }: NoteBarProps) {
    const { editor } = useCurrentEditor();
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [messageModalState, setMessageModalState] = useState<MessageModalState>({
        isOpen: false,
        message: '',
    });

    async function saveNote() {
        let noteTitle: string | undefined = noteTitleInputRef.current?.value;
        const noteContent: string = JSON.stringify(editor?.getJSON());

        const updateNote: UpdateNote = {
            title: noteTitle ? noteTitle : '',
            content: noteContent,
        }

        try {
            const response = await baseRequest<UpdateNote>({
                url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
                method: 'PATCH',
                body: updateNote
            });

            if (!response.ok) throw new Error();

            router.push(Paths.DOCS);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    setMessageModalState({
                        isOpen: true,
                        message: "Unauthorized: the note hasn't been saved"
                    });
                    return;
                }
            }

            setMessageModalState({
                isOpen: true,
                message: "The note hasn't been saved, save the note locally to your device, and try again later"
            });
        }
    }

    async function deleteNote() {
        try {
            const response = await baseRequest({
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

            setMessageModalState({
                isOpen: true,
                message: "The note hasn't been deleted, please try again later"
            });
        }
    }

    function toggleIsMessageModalOpen(isOpen: boolean) {
        setMessageModalState(prev => ({ 
            ...prev, 
            isOpen
        }));
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
                    message={messageModalState.message}
                    isMessageModalOpen={messageModalState.isOpen}
                    setIsMessageModalOpen={toggleIsMessageModalOpen}
                />
            </div>
        </div>
    );
}