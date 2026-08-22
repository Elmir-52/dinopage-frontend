import { Editor } from "@tiptap/react";
import { FormatStateSelector } from "../../lib/formatStateSelector";
import { createMarkControlsArray, MarkControl } from "../../lib/markControls";

export function useMarkControlsModel(editor: Editor, editorState: FormatStateSelector) {
    const markControls: MarkControl[] = createMarkControlsArray(editor, editorState);
    
    return {
        markControls
    }
}