'use client'

import { useCurrentEditor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { FONT_SIZE_CONTROLS } from "../../lib/fontSizeControls";

type ChangeFontSizeEvent = React.FocusEvent<HTMLInputElement, Element> | React.ChangeEvent<HTMLSelectElement>;

export default function FontSizeControls() {
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

    function changeFontSize(event: ChangeFontSizeEvent) {
        // если user решил поставить выделенному тексту 16px то у него просто 
        // уберётся font-size inline-style, так как 16px это дефолтный размер текста
        if (event.target.value === '16') {
            editor?.chain().focus().unsetFontSize().run();
        } else {
            editor?.chain().focus().setFontSize(`${event.target.value}px`).run();
        }
    }

    return (
        <div className="flex items-center gap-2">
            <input 
                className="w-25 border border-solid border-gray-400 outline-0 rounded-lg pl-2"
                onBlur={changeFontSize}
                onChange={(e) => setCurrentFontSize(e.target.value)}
                value={currentFontSize}
                type="text"
            />
            
            <select 
                onChange={e => { 
                    changeFontSize(e);
                    setCurrentFontSize(e.target.value);
                }}
            >
                {
                    FONT_SIZE_CONTROLS.map((el) => {
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