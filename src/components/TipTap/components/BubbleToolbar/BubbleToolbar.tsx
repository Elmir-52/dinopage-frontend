import { Editor, useEditorState } from "@tiptap/react";
import MarkControls from "../MarkControls/MarkControls";
import TextColor from "../TextColor/TextColor";
import FontSize from "../FontSize/FontSize";
import { useEffect } from "react";
import NodeControlsTrigger from "../NodeControlsTrigger/NodeControlsTrigger";
import { useAppDispatch } from "../../../../hook";
import { formatStateSelector } from "../../utils/formatStateSelector";
import { setEditorState } from "../../../../store/editorStateSlice";
import Divider from "../../../Divider/Divider";

interface BubbleToolbarProps {
    editor: Editor
}

export default function BubbleToolbar({ editor }: BubbleToolbarProps) {
    const dispatch = useAppDispatch();
    const editorState = useEditorState({
        editor,
        selector: formatStateSelector
    });
    
    useEffect(() => {
        dispatch(setEditorState({ editorState }));
    }, [editorState])

    return (
        <div 
            className="flex flex-col items-center gap-3 bg-white p-2.5 shadow-xl rounded-2xl
            border border-solid border-gray-300"
        >
            <NodeControlsTrigger />
            <Divider />
            <MarkControls />
            <Divider />
            <TextColor />
            <Divider />
            <FontSize />
        </div>
    )
}