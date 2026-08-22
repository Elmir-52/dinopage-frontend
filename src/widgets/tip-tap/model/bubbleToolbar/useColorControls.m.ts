import { Editor } from "@tiptap/react";
import { createColorControls } from "../../lib/bubbleToolbar/colorControls";

export function useColorControlsModel(editor: Editor) {
    const colorControls = createColorControls(editor);

    return { colorControls };
}