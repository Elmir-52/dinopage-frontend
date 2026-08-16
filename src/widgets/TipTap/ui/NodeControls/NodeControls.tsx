'use client'

import { type CSSProperties, type HTMLProps } from "react";
import { NodeControl } from "../../lib/nodeControls/createNodeControlsArray";

interface NodeControlsProps {
    ref: (node: HTMLElement | null) => void;
    style: CSSProperties;
    getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    nodeControls: NodeControl[];
}

export default function NodeControls({ ref, style, getFloatingProps, nodeControls }: NodeControlsProps) {
    return (
        <div
            className="flex flex-col bg-white shadow-xl rounded-xl border border-solid
            border-gray-300 p-1 text-xl"
            ref={ref}
            style={style}
            {...getFloatingProps()}
        >
            {
                nodeControls.map((nodeControl, i) => {
                    return <button
                        className={`px-3 py-0.5 rounded-md 
                            cursor-pointer hover:bg-gray-200 
                            ${nodeControl.isActive ? 'bg-gray-200' : ''}
                        `}
                        key={i}
                        onClick={() => {
                            nodeControl.onClick();
                        }}
                    >
                        <span>{nodeControl.content}</span>
                    </button>
                })
            }
        </div>
    )
}