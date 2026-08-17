'use client'

import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { flip, safePolygon, shift, useFloating, useHover, useInteractions } from "@floating-ui/react";
import { useCurrentEditor } from "@tiptap/react";
import { useAppSelector } from "@/shared/model";
import NodeControls from "../NodeControls/NodeControls";
import { createNodeControlsArray, NodeControl } from "../../lib/nodeControls";

export default function NodeControlsTrigger() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { editor } = useCurrentEditor();
    const editorState = useAppSelector(state => state.editorStateReducer.editorState);
    
    const nodeControls: NodeControl[] = useMemo(() => {
        return createNodeControlsArray(editor, editorState);
    }, [editorState]);
    
    const activeButton: NodeControl | undefined = nodeControls.find(nodeControl => nodeControl.isActive);
    
    const { refs, floatingStyles, context } = useFloating({
        placement: 'right',
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            shift(),
            flip()
        ]
    });
    
    const hover = useHover(context, {
        handleClose: safePolygon()
    });
    
    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
    
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

            {isOpen && (
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