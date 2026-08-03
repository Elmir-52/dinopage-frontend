import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { bubbleToolbarStateSelector, type BubbleToolbarStateSelector } from "../components/TipTap/utils/bubbleToolbarState";

interface SetEditorStateActionPayload {
    editorState: BubbleToolbarStateSelector;
}

interface EditorStateState {
    editorState: BubbleToolbarStateSelector;
}

const initialState: EditorStateState  = {
    editorState: bubbleToolbarStateSelector(null),
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