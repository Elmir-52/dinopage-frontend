'use client'

import { useCurrentEditor } from "@tiptap/react";
import { createMarkControlsArray, type MarkControl } from "@components/TipTap/utils/createMarkControlsArray";
import { useAppSelector } from "@/shared/model";


export default function MarkControls() {
    const { editor } = useCurrentEditor();
    const editorState = useAppSelector(state => state.editorStateReducer.editorState);

    const markControls: MarkControl[] = createMarkControlsArray(editor, editorState);

    return (
        <div className="grid grid-cols-5 items-center justify-between gap-1.5">
            {
                markControls.map((markControl, i) => {
                    return <button
                        key={i}
                        className="cursor-pointer hover:bg-gray-200 rounded-lg py-1 px-0.5
                        flex justify-center"
                        onClick={markControl.onClick}
                    >
                        {markControl.icon}
                    </button>
                })
            }
            {/* <button
                className="cursor-pointer hover:bg-gray-200 rounded-lg p-0.5
                bg-gradient-to-b from-red-600 via-orange-400 via-yellow-400 via-green-500 
                to-cyan-500"
                title="Background color"
            >
                <div className="w-6 bg-white rounded-md">
                    <span 
                        className="text-2xl leading-none
                        bg-gradient-to-b from-red-600 via-orange-400 via-yellow-400 
                        via-green-500 to-cyan-500 bg-clip-text text-transparent"
                    >
                        B
                    </span>
                </div>
            </button> */}
        </div>
    )
}