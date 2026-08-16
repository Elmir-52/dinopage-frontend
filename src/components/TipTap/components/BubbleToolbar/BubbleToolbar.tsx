'use client'

import { Editor, useEditorState } from "@tiptap/react";
import MarkControls from "@components/TipTap/components/MarkControls/MarkControls";
import TextColor from "@components/TipTap/components/TextColor/TextColor";
import FontSize from "@components/TipTap/components/FontSize/FontSize";
import { useEffect } from "react";
import NodeControlsTrigger from "@components/TipTap/components/NodeControlsTrigger/NodeControlsTrigger";
import Divider from "@components/Divider/Divider";
import { formatStateSelector } from "@components/TipTap/utils/formatStateSelector";
import { useAppDispatch } from "@/shared/model";
import { setEditorState } from "@/app/store/features/editorStateSlice";

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
            <TextColor />
            {
                editorState.isParagraph && (
                    <>
                        <Divider />
                        <FontSize />
                    </>
                )
            }
        </div>
    )
}