'use client'

import { useConfirmDialogModel, useMessageModalModel } from "@/shared/model";
import { useNoteListModel } from "./useNoteList.m";

export function useNoteListViewModel() {
    const { notes, getNotes, handleCreateNote, getNotesError, createNoteError } = useNoteListModel();
    
    const confirmDialog = useConfirmDialogModel('Create new note?', handleCreateNote);
    const getNotesMessageModal = useMessageModalModel(getNotesError, getNotes);
    const createNoteMessageModal = useMessageModalModel(createNoteError);

    return {
        notes,
        confirmDialog, 
        getNotesMessageModal, 
        createNoteMessageModal,
    }
}