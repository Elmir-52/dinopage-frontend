import { Editor } from '@tiptap/react';
import type { SubBubbleMenuStateSelector } from './subBubbleMenuState';
import type { ReactNode } from 'react';

export interface NodeControl {
    onClick: () => void;
    children: ReactNode;
    isActive: boolean;
}

export function createNodeControlsArray(
    editor: Editor | null, 
    editorState: SubBubbleMenuStateSelector
): NodeControl[] {
    return [
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
            children: <span>Heading 1</span>,
            isActive: editorState.isHeading1,
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
            children: <span>Heading 2</span>,
            isActive: editorState.isHeading2,
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
            children: <span>Heading 3</span>,
            isActive: editorState.isHeading3,
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
            children: <span>Heading 4</span>,
            isActive: editorState.isHeading4,
        },
    ];
}