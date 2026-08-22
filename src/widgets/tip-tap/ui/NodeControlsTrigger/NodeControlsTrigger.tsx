'use client'

import { ChevronRight } from "lucide-react";
import NodeControls from "../NodeControls/NodeControls";
import { NodeControlsModel } from "../../model/bubbleToolbar/useNodeControls.m";

type NodeControlsTriggerProps = NodeControlsModel

export default function NodeControlsTrigger({
    isNodeControlsFloatingOpen,
    nodeControls,
    activeButton,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps
}: NodeControlsTriggerProps) {
    return (
        <>
            <button 
                className="w-full flex items-center justify-between pl-2 rounded-md cursor-pointer
                hover:bg-gray-200 text-xl"
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                <span>
                    {activeButton ? activeButton.content : ''}
                </span>
                <ChevronRight />
            </button>

            {isNodeControlsFloatingOpen && (
                <NodeControls
                    ref={refs.setFloating}
                    style={floatingStyles}
                    getFloatingProps={getFloatingProps}
                    nodeControls={nodeControls}
                />
            )}
        </>
    )
}