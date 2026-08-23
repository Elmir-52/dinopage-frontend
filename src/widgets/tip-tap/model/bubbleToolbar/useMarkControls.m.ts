import { Editor } from "@tiptap/react";
import { FormatStateSelector } from "../../lib/bubbleToolbar/formatStateSelector";
import { createMarkControlsArray, MarkControl } from "../../lib/bubbleToolbar/markControls";

export function useMarkControlsModel(editor: Editor, editorState: FormatStateSelector) {
    const markControls: MarkControl[] = createMarkControlsArray(editor, editorState);
    
    return {
        markControls
    }
}