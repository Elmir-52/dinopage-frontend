import { ChevronRight } from "lucide-react";
import NodeControls from "../NodeControls/NodeControls";
import { useEffect, useRef, useState } from "react";
import { safePolygon, useFloating, useHover, useInteractions } from "@floating-ui/react";

export default function SetNodeMenuTrigger() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { refs, floatingStyles, context } = useFloating({
        placement: 'right',
        open: isOpen,
        onOpenChange: setIsOpen,
    });

    const hover = useHover(context, {
        handleClose: safePolygon()
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

    return (
        <>
            <button 
                className="w-full flex items-center justify-between pl-2 rounded-md cursor-pointer
                hover:bg-gray-200"
                ref={refs.setReference}
                {...getReferenceProps()}
            >
                <p className="text-xl font-[Nunito]">Text</p>
                <ChevronRight />
            </button>

            {isOpen && (
                <NodeControls
                    ref={refs.setFloating}
                    style={floatingStyles}
                    getFloatingProps={getFloatingProps}
                />
            )}
        </>
    )
}