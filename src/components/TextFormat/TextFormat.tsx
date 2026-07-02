import { useCurrentEditor } from "@tiptap/react";
import { Bold, CodeXml, Italic, Strikethrough, Underline } from 'lucide-react'
import type { SubBubbleMenuStateSelector } from "../../utils/subBubbleMenuState";

interface TextFormatProps {
    editorState: SubBubbleMenuStateSelector
}

export default function TextFormat({ editorState }: TextFormatProps) {
    const { editor } = useCurrentEditor();

    return (
        <div className="flex items-center gap-2.5">
            <button
                className="cursor-pointer"
                onClick={() => editor?.chain().focus().toggleBold().run()}
            >
                <Bold size={23} color={editorState.isBold ? '#0000ff' : '#000'} />
            </button>

            <button
                className="cursor-pointer"
                onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
                <Italic size={23} color={editorState.isItalic ? '#0000ff' : '#000'} />
            </button>

            <button
                className="cursor-pointer"
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
            >
                <Underline size={23} color={editorState.isUnderline ? '#0000ff' : '#000'} />
            </button>

            <button
                className="cursor-pointer"
                onClick={() => editor?.chain().focus().toggleStrike().run()}
            >
                <Strikethrough size={23} color={editorState.isStrike ? '#0000ff' : '#000'} />
            </button>

            <button
                className="cursor-pointer"
                onClick={() => editor?.chain().focus().toggleCode().run()}
            >
                <CodeXml size={23} color={editorState.isCode ? '#0000ff' : '#000'} />
            </button>
        </div>
    )
}