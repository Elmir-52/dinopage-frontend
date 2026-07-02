import { useCurrentEditor } from "@tiptap/react";
import { FONT_SIZE_LIST } from "../../shared/data/fontSizeList";
import { useEffect, useState } from "react";

export default function FontSize() {
    const { editor } = useCurrentEditor();
    
    const [currentFontSize, setCurrentFontSize] = useState<string | undefined>();

    useEffect(() => {
        function handleSelection() {
            const fontSize = editor?.getAttributes('textStyle').fontSize;
            if (!fontSize) {
                setCurrentFontSize('16');
                return;
            }
            setCurrentFontSize(fontSize?.slice(0, -2));
        }

        editor?.on('selectionUpdate', handleSelection);
        
        return () => {
            editor?.off('selectionUpdate', handleSelection);
        }
    }, [editor]);

    return (
        <div className="flex items-center gap-2">
            <input 
                className="w-25 border border-solid border-gray-400 outline-0 rounded-lg pl-2"
                onBlur={e => editor?.chain().focus().setFontSize(`${e.target.value}px`).run()}
                onChange={(e) => setCurrentFontSize(e.target.value)}
                value={currentFontSize}
                type="text"
            />
            
            <select 
                onChange={e => { 
                    editor?.chain().focus().setFontSize(`${e.target.value}px`).run();
                    setCurrentFontSize(e.target.value);
                }}
            >
                {
                    FONT_SIZE_LIST.map((el) => {
                        if (currentFontSize === el.value) {
                            return <option 
                                key={el.value} 
                                value={el.value}
                                selected
                            >
                                {el.value}
                            </option>
                        } else {
                            return <option 
                                key={el.value} 
                                value={el.value}
                            >
                                {el.value}
                            </option>
                        }
                    })
                }
            </select>
        </div>
    );
}