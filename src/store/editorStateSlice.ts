import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { subBubbleMenuStateSelector, type SubBubbleMenuStateSelector } from "../utils/subBubbleMenuState";

interface SetEditorStateActionPayload {
    editorState: SubBubbleMenuStateSelector;
}

interface EditorStateState {
    editorState: SubBubbleMenuStateSelector;
}

const initialState: EditorStateState  = {
    editorState: subBubbleMenuStateSelector(null),
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