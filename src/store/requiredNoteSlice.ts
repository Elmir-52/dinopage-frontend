import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NoteDb } from "../App";

export interface RequiredNoteActionPayload {
    requiredNote: NoteDb;
}

interface State {
    requiredNote: NoteDb
}

const initialState: State = {
    requiredNote: {
        note_id: '',
        user_id: '',
        title: '', 
        content: '',
        date: '',
    }
}

const requiredNoteSlice = createSlice({
    name: 'requiredNote',
    initialState,
    reducers: {
        setRequedNote(state, action: PayloadAction<RequiredNoteActionPayload>) {
            state.requiredNote = action.payload.requiredNote;
        }
    }
});

export const { setRequedNote } = requiredNoteSlice.actions;

const requiredNoteReducer = requiredNoteSlice.reducer;
export default requiredNoteReducer