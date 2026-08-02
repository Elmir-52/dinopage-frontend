import { Editor, useEditorState } from "@tiptap/react";
import MarkControls from "../MarkControls/MarkControls";
import { subBubbleMenuStateSelector } from "../../utils/subBubbleMenuState";
import TextColor from "../TextColor/TextColor";
import FontSize from "../FontSize/FontSize";
import Divider from "../Divider/Divider";
import { useEffect } from "react";
import { useAppDispatch } from "../../hook";
import { setEditorState } from "../../store/editorStateSlice";

interface SubBubbleMenuProps {
    editor: Editor
}

export default function SubBubbleMenu({ editor }: SubBubbleMenuProps) {
    const editorState = useEditorState({
        editor,
        selector: subBubbleMenuStateSelector
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setEditorState({ editorState }));
    }, [editorState])

    return (
        <div 
            className="flex flex-col items-center gap-3 bg-white p-2.5 shadow-xl rounded-2xl
            border border-solid border-gray-300"
        >
            
            <MarkControls />
            <Divider />
            <TextColor />
            <Divider />
            <FontSize />
        </div>
    )
}