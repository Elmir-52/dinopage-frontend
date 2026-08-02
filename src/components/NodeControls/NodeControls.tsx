import { isActive, useCurrentEditor } from "@tiptap/react";
import { createPortal } from "react-dom";
import { useAppSelector } from "../../hook";
import { useEffect, useRef, type CSSProperties, type HTMLProps, type ReactNode, type RefObject } from "react";
import { createNodeControlsArray, type NodeControl } from "../../utils/createNodeControlsArray";

interface NodeControlsProps {
    ref: (node: HTMLElement | null) => void;
    style: CSSProperties;
    getFloatingProps: (userProps?: HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
}

export default function NodeControls({ ref, style, getFloatingProps }: NodeControlsProps) {
    const { editor } = useCurrentEditor();
    const editorState = useAppSelector(state => state.editorStateReducer.editorState);

    const nodeControls: NodeControl[] = createNodeControlsArray(editor, editorState);

    return (
        <div
            className="flex flex-col bg-white shadow-xl rounded-xl border border-solid
            border-gray-300 p-1 text-xl font-[Nunito]"
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
                        {nodeControl.children}
                    </button>
                })
            }
        </div>
    )
}