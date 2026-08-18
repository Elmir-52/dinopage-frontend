import { Note, useConfirmDialogModel, useErrorDialogModel } from "@/shared/model";
import { useEditorModel } from "./useEditor.m";
import { useNoteBarModel } from "./useNoteBar.m";

export function useTipTapViewModel(note: Note) {
    const { editor, noteTitleInputRef } = useEditorModel(note);
    const { 
        updateNote, 
        deleteNote, 
        updateNoteError, 
        deleteNoteError 
    } = useNoteBarModel(noteTitleInputRef, editor);

    const confirmDialog = useConfirmDialogModel("Do you want to delete your note?", deleteNote);
    const updateNoteErrorDialog = useErrorDialogModel(updateNoteError);
    const deleteNoteErrorDialog = useErrorDialogModel(deleteNoteError);

    return {
        editor,
        noteTitleInputRef,
        updateNote,
        confirmDialog,
        updateNoteErrorDialog,
        deleteNoteErrorDialog
    }
}