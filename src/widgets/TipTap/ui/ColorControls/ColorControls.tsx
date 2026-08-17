'use client'

import { useCurrentEditor } from "@tiptap/react";
import { COLOR_CONTROLS } from "../../lib/colorControls";

export default function ColorControls() {
    const { editor } = useCurrentEditor()
    
    return(
        <div className="w-full grid grid-cols-5 items-center justify-between gap-1.5">
            <button 
                className="border-2 border-solid border-black rounded-lg
                cursor-pointer bg-white"
                title="Default color"
                onClick={() => editor?.chain().focus().unsetColor().run()}
            >
                <span className="font-semibold text-lg leading-0">A</span>
            </button>
            {
                COLOR_CONTROLS.map(colorControl => {
                    return <button 
                        className="border-2 border-solid rounded-lg
                        cursor-pointer bg-white"
                        key={colorControl.text}
                        onClick={() => editor?.chain().focus().setColor(colorControl.textColor).run()} 
                        style={{borderColor: colorControl.textColor}}
                        title={colorControl.text}
                    >
                        <span 
                            className="font-semibold text-lg leading-0"
                            style={{color: colorControl.textColor}}
                        >
                            A
                        </span>
                    </button>
                })
            }
        </div>
    );
}