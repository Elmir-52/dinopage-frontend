import { Editor } from '@tiptap/react';
import type { FormatStateSelector } from './formatStateSelector';

export interface NodeControl {
    onClick: () => void;
    content: string;
    isActive: boolean;
}

export function createNodeControlsArray(
    editor: Editor | null, 
    editorState: FormatStateSelector
): NodeControl[] {
    return [
        {
            onClick: () => editor?.chain().focus().setParagraph().run(),
            content: 'Text',
            isActive: editorState.isParagraph,
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
            content: 'Heading 1',
            isActive: editorState.isHeading1,
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
            content: 'Heading 2',
            isActive: editorState.isHeading2,
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
            content: 'Heading 3',
            isActive: editorState.isHeading3,
        },
        {
            onClick: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
            content: 'Heading 4',
            isActive: editorState.isHeading4,
        },
    ];
}