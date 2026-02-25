import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NoteIdState {
    noteId: string;
}

export interface NoteIdActionPayload {
    id: string;
}

const initialState: NoteIdState  = {
    noteId: '',
}

const noteIdSlice = createSlice({
    name: 'noteId',
    initialState,
    reducers: {
        setNoteId(state, action: PayloadAction<NoteIdActionPayload>) {
            state.noteId = action.payload.id;
        }
    }
})

export const { setNoteId } = noteIdSlice.actions;

const noteIdReducer = noteIdSlice.reducer;
export default noteIdReducer;