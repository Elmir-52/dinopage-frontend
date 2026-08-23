'use client'

import { Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { ConfirmDialogModel, ErrorDialogModel, PagePaths } from "@/shared/model";
import { ConfirmDialog, ErrorDialog, Modal } from "@/shared/ui";

interface NoteBarProps {
    updateNote: () => Promise<void>;
    confirmDialog: ConfirmDialogModel;
    updateNoteErrorDialog: ErrorDialogModel;
    deleteNoteErrorDialog: ErrorDialogModel;
}

export default function NoteBar({
    updateNote,
    confirmDialog,
    updateNoteErrorDialog,
    deleteNoteErrorDialog
}: NoteBarProps) {
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
                    onClick={() => confirmDialog.toggleIsOpen(true)}
                >
                    <Trash2 size={26} color="#ff0000"/>
                    Delete
                </button>

                <Modal isOpen={confirmDialog.confirmDialogState.isOpen}>
                    <ConfirmDialog
                        {...confirmDialog.confirmDialogState}
                        setIsOpen={confirmDialog.toggleIsOpen}
                    />
                </Modal>

                <Modal isOpen={updateNoteErrorDialog.errorDialogState.isOpen}>
                    <ErrorDialog
                        {...updateNoteErrorDialog.errorDialogState}
                        setIsOpen={updateNoteErrorDialog.toggleIsOpen}
                    />
                </Modal>

                <Modal isOpen={deleteNoteErrorDialog.errorDialogState.isOpen}>
                    <ErrorDialog
                        {...deleteNoteErrorDialog.errorDialogState}
                        setIsOpen={deleteNoteErrorDialog.toggleIsOpen}
                    />
                </Modal>
            </div>
        </div>
    );
}