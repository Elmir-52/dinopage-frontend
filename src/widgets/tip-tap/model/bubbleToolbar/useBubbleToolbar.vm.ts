import { Editor } from "@tiptap/react";
import { useEditorStateModel } from "./useEditorState.m";
import { useNodeControlsModel } from "./useNodeControls.m";
import { useMarkControlsModel } from "./useMarkControls.m";
import { useColorControlsModel } from "./useColorControls.m";
import { useFontSizeControlsModel } from "./useFontSizeControls.m";

export function useBubbleToolbarViewModel(editor: Editor) {
    const { editorState } = useEditorStateModel(editor);
    const nodeControlsModel = useNodeControlsModel(editor, editorState);
    const { markControls } = useMarkControlsModel(editor, editorState);
    const { colorControls } = useColorControlsModel(editor);
    const fontSizeControlsModel = useFontSizeControlsModel(editor)

    return {
        editorState,
        nodeControlsModel,
        markControls,
        colorControls,
        fontSizeControlsModel
    }
}