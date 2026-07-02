import { COLOR_BUTTONS } from "../../shared/data/colorButtons";
import { useCurrentEditor } from "@tiptap/react";

export default function TextColor() {
    const { editor } = useCurrentEditor()
    
    return(
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-5 gap-2">
                {
                    COLOR_BUTTONS.map(colorButton => {
                        return <button 
                            className="w-6 h-6 border border-solid border-gray-300 rounded-full 
                            cursor-pointer"
                            key={colorButton.text}
                            onClick={() => editor?.chain().focus().setColor(colorButton.textColor).run()} 
                            style={{backgroundColor: colorButton.textColor}}
                            title={colorButton.text}
                        ></button>
                    })
                }
            </div>
            <button 
                className="w-full py-1 bg-gray-200 rounded-xl hover:bg-gray-300 cursor-pointer"
                onClick={() => editor?.chain().focus().unsetColor().run()}
            >
                Unset color
            </button>
        </div>
    );
}