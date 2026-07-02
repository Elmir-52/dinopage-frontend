import { Editor, useEditorState } from "@tiptap/react";
import TextFormat from "../TextFormat/TextFormat";
import { subBubbleMenuStateSelector } from "../../utils/subBubbleMenuState";
import TextColor from "../TextColor/TextColor";
import FontSize from "../FontSize/FontSize";

interface SubBubbleMenuProps {
    editor: Editor
}

export default function SubBubbleMenu({ editor }: SubBubbleMenuProps) {
    const editorState = useEditorState({
        editor,
        selector: subBubbleMenuStateSelector
    });

    return (
        <div 
            className="flex flex-col items-center gap-5 bg-white p-2.5 shadow-xl rounded-2xl
            border border-solid border-gray-300 z-10"
        >
            <TextFormat editorState={editorState}/>
            <TextColor />
            <FontSize />
        </div>
    )
}