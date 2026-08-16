'use client'

import { useCurrentEditor } from "@tiptap/react"
import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MessageModalState, PagePaths } from "@/shared/model";
import { updateNoteRequest } from "../../api/updateNoteRequest";
import { deleteNoteRequest } from "../../api/deleteNoteRequest";
import { MessageModal, Modal } from "@/shared/ui";

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

    function updateNote() {
        let noteTitle: string | undefined = noteTitleInputRef.current?.value;
        const noteContent: string = JSON.stringify(editor?.getJSON());

        updateNoteRequest(
            id,
            noteTitle,
            noteContent,
            router,
            setMessageModalState
        );
    }

    function deleteNote() {
        deleteNoteRequest(
            id,
            router,
            setMessageModalState
        )
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
                    href={PagePaths.DOCS}
                    className="flex items-center gap-4 w-full rounded-xl px-2.5 py-1.5 
                    text-xl cursor-pointer hover:bg-gray-200"
                >
                    <img className="w-6.5" src="/dino.png" alt="Dino logo" title="Go to home"/> 
                    Home
                </Link>

                <button 
                    className="flex items-center gap-4 w-full rounded-xl px-2.5 py-1.5 
                    text-xl cursor-pointer hover:bg-gray-200"
                    onClick={updateNote}
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