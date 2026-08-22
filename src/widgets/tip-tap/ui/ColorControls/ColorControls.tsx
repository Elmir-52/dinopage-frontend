'use client'

import { ColorControl } from "../../lib/colorControls";

interface ColorControlsProps {
    colorControls: ColorControl[]
}

export default function ColorControls({ colorControls }: ColorControlsProps) {
    return(
        <div className="w-full grid grid-cols-5 items-center justify-between gap-1.5">
            {
                colorControls.map(colorControl => {
                    return <button 
                        className="border-2 border-solid rounded-lg
                        cursor-pointer bg-white"
                        key={colorControl.title}
                        onClick={colorControl.onClick} 
                        style={{borderColor: colorControl.hexColor}}
                        title={colorControl.title}
                    >
                        <span 
                            className="font-semibold text-lg leading-0"
                            style={{color: colorControl.hexColor}}
                        >
                            A
                        </span>
                    </button>
                })
            }
        </div>
    );
}