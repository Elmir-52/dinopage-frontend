'use client'

import dynamic from "next/dynamic";
import CreateNoteButton from "../CreateNoteButton/CreateNoteButton";
import { ConfirmDialog, MessageModal } from "@/shared/ui";
import { useNoteListViewModel } from "../../model/useNoteList.vm";

// NoteCard импортируется динамически без ssr, ибо внутри него есть код создания даты,
// при разных часовых поясах будет ошибка гидратации
const DynamicNoteCard = dynamic(() => import('../NoteCard/NoteCard'), {
    ssr: false,
});

export default function NoteList() {
    const {
        notes,
        confirmDialog, 
        getNotesMessageModal, 
        createNoteMessageModal
    } = useNoteListViewModel();
        
    return (
        <section className="grid grid-cols-[repeat(auto-fill,150px)] justify-center items-center 
        gap-7 w-[90%] mx-auto mb-12">
            {
                notes?.map(el => {
                    return <DynamicNoteCard key={el.noteId} content={el}></DynamicNoteCard>
                })
            }

            <CreateNoteButton onClick={confirmDialog.toggleIsOpen}></CreateNoteButton>
            
            <ConfirmDialog
                message={confirmDialog.confirmDialogState.message}
                isOpen={confirmDialog.confirmDialogState.isOpen}
                setIsOpen={confirmDialog.toggleIsOpen}
                onClick={confirmDialog.confirmDialogState.onClick}
            />

            <MessageModal
                message={getNotesMessageModal.messageModalState.message}
                isMessageModalOpen={getNotesMessageModal.messageModalState.isOpen}
                setIsMessageModalOpen={getNotesMessageModal.toggleIsMessageModalOpen}
                onClick={getNotesMessageModal.messageModalState.onClick}
            />

            <MessageModal
                message={createNoteMessageModal.messageModalState.message}
                isMessageModalOpen={createNoteMessageModal.messageModalState.isOpen}
                setIsMessageModalOpen={createNoteMessageModal.toggleIsMessageModalOpen}
                onClick={createNoteMessageModal.messageModalState.onClick}
            />
        </section>
    );
}