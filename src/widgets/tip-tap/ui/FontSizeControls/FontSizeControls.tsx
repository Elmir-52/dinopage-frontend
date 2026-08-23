'use client'

import { FONT_SIZE_CONTROLS } from "../../lib/bubbleToolbar/fontSizeControls";
import { ChangeFontSize, SetCurrentFontSize } from "../../model/bubbleToolbar/useFontSizeControls.m";


interface FontSizeControlsProps {
    currentFontSize: string | undefined,
    setCurrentFontSize: SetCurrentFontSize,
    changeFontSize: ChangeFontSize
}

export default function FontSizeControls({
    currentFontSize,
    setCurrentFontSize,
    changeFontSize
}: FontSizeControlsProps) {
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
                    setCurrentFontSize(e.target.value)
                }}
            >
                {
                    FONT_SIZE_CONTROLS.map((fontSizeControl) => {
                        if (currentFontSize === fontSizeControl.fontSize) {
                            return <option 
                                key={fontSizeControl.fontSize} 
                                value={fontSizeControl.fontSize}
                                selected
                            >
                                {fontSizeControl.fontSize}
                            </option>
                        } else {
                            return <option 
                                key={fontSizeControl.fontSize} 
                                value={fontSizeControl.fontSize}
                            >
                                {fontSizeControl.fontSize}
                            </option>
                        }
                    })
                }
            </select>
        </div>
    );
}