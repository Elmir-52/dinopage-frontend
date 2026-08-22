'use client'

import { MarkControl } from "../../lib/markControls";

interface MarkControlsProps {
    markControls: MarkControl[]
}

export default function MarkControls({ markControls }: MarkControlsProps) {
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
        </div>
    )
}