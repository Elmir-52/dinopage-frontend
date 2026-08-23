import { useConfirmDialogModel, useErrorDialogModel } from "@/shared/model";
import { useEditorModel } from "./useEditor.m";
import { useNoteBarModel } from "./useNoteBar.m";
import { useGetNoteDataModel } from "./useGetNoteData.m";

export function useTipTapViewModel() {
    const { note } = useGetNoteDataModel();

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
        note,
        editor,
        noteTitleInputRef,
        updateNote,
        confirmDialog,
        updateNoteErrorDialog,
        deleteNoteErrorDialog
    }
}