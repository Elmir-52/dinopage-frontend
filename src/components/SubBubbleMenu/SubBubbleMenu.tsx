import { Editor, useEditorState } from "@tiptap/react";
import TextFormat from "../TextFormat/TextFormat";
import { subBubbleMenuStateSelector } from "../../utils/subBubbleMenuState";

interface SubBubbleMenuProps {
    editor: Editor
}

export default function SubBubbleMenu({ editor }: SubBubbleMenuProps) {
    const editorState = useEditorState({
        editor,
        selector: subBubbleMenuStateSelector
    });

    return (
        <div className="bg-gray-100 p-2.5 shadow-xl rounded-2xl">
            <TextFormat editorState={editorState}/>
        </div>
    )
}