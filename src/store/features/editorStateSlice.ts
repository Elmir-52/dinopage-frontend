import { formatStateSelector, FormatStateSelector } from "@/components/TipTap/utils/formatStateSelector";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

const editorStateReducer = editorStateSlice.reducer;
export default editorStateReducer;