'use client'

import dynamic from "next/dynamic";
import CreateNoteButton from "../CreateNoteButton/CreateNoteButton";
import { ConfirmDialog, ErrorDialog, Modal } from "@/shared/ui";
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
        getNotesErrorDialog, 
        createNoteErrorDialog
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
            
            <Modal isOpen={confirmDialog.confirmDialogState.isOpen}>
                <ConfirmDialog
                    {...confirmDialog.confirmDialogState}
                    setIsOpen={confirmDialog.toggleIsOpen}
                />
            </Modal>

            <Modal isOpen={getNotesErrorDialog.errorDialogState.isOpen}>
                <ErrorDialog
                    {...getNotesErrorDialog.errorDialogState}
                    setIsOpen={getNotesErrorDialog.toggleIsOpen}
                />
            </Modal>

            <Modal isOpen={createNoteErrorDialog.errorDialogState.isOpen}>
                <ErrorDialog
                    {...createNoteErrorDialog.errorDialogState}
                    setIsOpen={createNoteErrorDialog.toggleIsOpen}
                />
            </Modal>
        </section>
    );
}