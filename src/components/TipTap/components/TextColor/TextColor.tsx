'use client'

import { useCurrentEditor } from "@tiptap/react";
import { COLOR_BUTTONS } from "@components/TipTap/data/colorButtons";

export default function TextColor() {
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
                COLOR_BUTTONS.map(colorButton => {
                    return <button 
                        className="border-2 border-solid rounded-lg
                        cursor-pointer bg-white"
                        key={colorButton.text}
                        onClick={() => editor?.chain().focus().setColor(colorButton.textColor).run()} 
                        style={{borderColor: colorButton.textColor}}
                        title={colorButton.text}
                    >
                        <span 
                            className="font-semibold text-lg leading-0"
                            style={{color: colorButton.textColor}}
                        >
                            A
                        </span>
                    </button>
                })
            }
        </div>
    );
}