import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NoteDb } from "../App";

export interface RequiredNoteActionPayload {
    requiredNote: NoteDb;
}

export interface TitleActionPayload {
    title: string;
}

export interface ContentActionPayload {
    content: string;
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
        },
        
        setTitle(state, action: PayloadAction<TitleActionPayload>) {
            state.requiredNote.title = action.payload.title;
        },

        setContent(state, action: PayloadAction<ContentActionPayload>) {
            state.requiredNote.content = action.payload.content;
        }
    }
});

export const { setRequedNote, setTitle, setContent } = requiredNoteSlice.actions;

const requiredNoteReducer = requiredNoteSlice.reducer;
export default requiredNoteReducer