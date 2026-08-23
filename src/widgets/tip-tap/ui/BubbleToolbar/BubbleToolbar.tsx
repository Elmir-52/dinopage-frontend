'use client'

import { Editor } from "@tiptap/react";
import NodeControlsTrigger from "../NodeControlsTrigger/NodeControlsTrigger";
import MarkControls from "../MarkControls/MarkControls";
import ColorControls from "../ColorControls/ColorControls";
import FontSizeControls from "../FontSizeControls/FontSizeControls";
import Divider from "../Divider/Divider";
import { useBubbleToolbarViewModel } from "../../model/bubbleToolbar/useBubbleToolbar.vm";

interface BubbleToolbarProps {
    editor: Editor
}

export default function BubbleToolbar({ editor }: BubbleToolbarProps) {
    const {
        editorState,
        nodeControlsModel,
        markControls,
        colorControls,
        fontSizeControlsModel
    } = useBubbleToolbarViewModel(editor);

    return (
        <div 
            className="flex flex-col items-center gap-3 bg-white p-2.5 shadow-xl rounded-2xl
            border border-solid border-gray-300"
        >
            <NodeControlsTrigger {...nodeControlsModel}/>
            <Divider />
            <MarkControls markControls={markControls}/>
            <Divider />
            <ColorControls colorControls={colorControls}/>
            {
                editorState.isParagraph && (
                    <>
                        <Divider />
                        <FontSizeControls {...fontSizeControlsModel}/>
                    </>
                )
            }
        </div>
    )
}