'use client'

import { useConfirmDialogModel, useErrorDialogModel } from "@/shared/model";
import { useNoteListModel } from "./useNoteList.m";

export function useNoteListViewModel() {
    const { notes, getNotes, handleCreateNote, getNotesError, createNoteError } = useNoteListModel();
    
    const confirmDialog = useConfirmDialogModel('Create new note?', handleCreateNote);
    const getNotesErrorDialog = useErrorDialogModel(getNotesError, getNotes);
    const createNoteErrorDialog = useErrorDialogModel(createNoteError);

    return {
        notes,
        confirmDialog, 
        getNotesErrorDialog, 
        createNoteErrorDialog,
    }
}