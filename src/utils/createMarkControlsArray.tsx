import { Editor } from '@tiptap/react';
import { Bold, CodeXml, Italic, Strikethrough, Underline } from 'lucide-react'
import type { SubBubbleMenuStateSelector } from './subBubbleMenuState';
import type { ReactNode } from 'react';

export interface MarkControl {
    onClick: () => void;
    icon: ReactNode;
}

export function createMarkControlsArray(
    editor: Editor | null, 
    editorState: SubBubbleMenuStateSelector
): MarkControl[] {
    return [
        {
            onClick: () => editor?.chain().focus().toggleBold().run(),
            icon: <Bold size={20} color={editorState.isBold ? '#0000ff' : '#000'} />,
        },
        {
            onClick: () => editor?.chain().focus().toggleItalic().run(),
            icon: <Italic size={20} color={editorState.isItalic ? '#0000ff' : '#000'} />,
        },
        {
            onClick: () => editor?.chain().focus().toggleUnderline().run(),
            icon: <Underline size={20} color={editorState.isUnderline ? '#0000ff' : '#000'} />,
        },
        {
            onClick: () => editor?.chain().focus().toggleStrike().run(),
            icon: <Strikethrough size={20} color={editorState.isStrike ? '#0000ff' : '#000'} />,
        },
        {
            onClick: () => editor?.chain().focus().toggleCode().run(),
            icon: <CodeXml size={20} color={editorState.isCode ? '#0000ff' : '#000'} />,
        },
    ]
}