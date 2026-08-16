'use client'

import { Editor, useEditorState } from "@tiptap/react";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/model";
import { formatStateSelector } from "../../lib/stateSelector/formatStateSelector";
import NodeControlsTrigger from "../NodeControlsTrigger/NodeControlsTrigger";
import MarkControls from "../MarkControls/MarkControls";
import ColorControls from "../ColorControls/ColorControls";
import FontSizeControls from "../FontSizeControls/FontSizeControls";
import { setEditorState } from "../../model/slice";
import Divider from "../Divider/Divider";

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
    }, [editorState]);

    return (
        <div 
            className="flex flex-col items-center gap-3 bg-white p-2.5 shadow-xl rounded-2xl
            border border-solid border-gray-300"
        >
            <NodeControlsTrigger />
            <Divider />
            <MarkControls />
            <Divider />
            <ColorControls />
            {
                editorState.isParagraph && (
                    <>
                        <Divider />
                        <FontSizeControls />
                    </>
                )
            }
        </div>
    )
}