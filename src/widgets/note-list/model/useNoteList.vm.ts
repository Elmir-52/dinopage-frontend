'use client'

import { useMessageModalModel, useModalModel } from "@/shared/model";
import { useNoteListModel } from "./useNoteList.m";

export function useNoteListViewModel() {
    const { notes, getNotes, handleCreateNote, getNotesError, createNoteError } = useNoteListModel();
    
    const modal = useModalModel('Create new note?', handleCreateNote);
    const getNotesMessageModal = useMessageModalModel(getNotesError, getNotes);
    const createNoteMessageModal = useMessageModalModel(createNoteError);

    return {
        notes,
        modal, 
        getNotesMessageModal, 
        createNoteMessageModal,
    }
}