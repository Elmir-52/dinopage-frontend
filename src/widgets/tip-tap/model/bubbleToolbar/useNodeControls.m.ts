import { Editor } from "@tiptap/react";
import { FormatStateSelector } from "../../lib/bubbleToolbar/formatStateSelector";
import { useState } from "react";
import { createNodeControlsArray, NodeControl } from "../../lib/bubbleToolbar/nodeControls";
import { safePolygon, useFloating, useHover, useInteractions } from "@floating-ui/react";
import { flip, shift } from "@floating-ui/dom";

export function useNodeControlsModel(editor: Editor, editorState: FormatStateSelector) {
    const [isNodeControlsFloatingOpen, setIsNodeControlsFloatingOpen] = useState<boolean>(false);
    
    const { refs, floatingStyles, context } = useFloating({
        placement: 'right',
        open: isNodeControlsFloatingOpen,
        onOpenChange: setIsNodeControlsFloatingOpen,
        middleware: [
            shift(),
            flip()
        ]
    });
    
    const hover = useHover(context, {
        restMs: 250,
        handleClose: safePolygon()
    });
    
    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    const nodeControls: NodeControl[] = createNodeControlsArray(editor, editorState);
    const activeButton: NodeControl | undefined = nodeControls.find(nodeControl => nodeControl.isActive);

    return {
        isNodeControlsFloatingOpen,
        nodeControls,
        activeButton,
        refs,
        floatingStyles,
        getReferenceProps,
        getFloatingProps
    }
}

export type NodeControlsModel = ReturnType<typeof useNodeControlsModel>;