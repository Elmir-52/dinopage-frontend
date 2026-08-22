import { Editor, useEditorState } from "@tiptap/react";
import { formatStateSelector } from "../../lib/bubbleToolbar/formatStateSelector";

export function useEditorStateModel(editor: Editor) {
    const editorState = useEditorState({
        editor,
        selector: formatStateSelector
    });

    return { editorState };
}