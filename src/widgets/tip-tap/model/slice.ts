import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { formatStateSelector, FormatStateSelector } from "../lib/bubbleToolbar/formatStateSelector";

interface SetEditorStateActionPayload {
    editorState: FormatStateSelector;
}

interface EditorStateState {
    editorState: FormatStateSelector;
}

const initialState: EditorStateState  = {
    editorState: formatStateSelector(null),
}

const editorStateSlice = createSlice({
    name: 'editorState',
    initialState,
    reducers: {
        setEditorState(state, action: PayloadAction<SetEditorStateActionPayload>) {
            state.editorState = action.payload.editorState;
        }
    }
})

export const { setEditorState } = editorStateSlice.actions;

export const editorStateReducer = editorStateSlice.reducer;