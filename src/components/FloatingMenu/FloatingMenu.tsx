import { Plus } from "lucide-react";
import { useRef } from "react";
import { createPortal } from 'react-dom';

export default function FloatingMenu() {
    const floatingMenuRef = useRef<HTMLDivElement | null>(null);


    return createPortal(
        <div
            id="floating-menu"
            className="hidden absolute left-4"
            ref={floatingMenuRef}
            onMouseEnter={e => {
                if (floatingMenuRef.current) {
                    floatingMenuRef.current.style.display = 'block'
                }
            }}
        >
            <button className="cursor-pointer">
                <Plus color="gray"/>
            </button>
        </div>,
        document.body
    )
}