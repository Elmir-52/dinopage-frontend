import { useCurrentEditor } from "@tiptap/react";
import { Bold, CodeXml, icons, Italic, Link, Strikethrough, Underline } from 'lucide-react'
import type { SubBubbleMenuStateSelector } from "../../utils/subBubbleMenuState";
import type { ReactNode } from "react";

interface TextFormatProps {
    editorState: SubBubbleMenuStateSelector
}

interface TextFormatButton {
    onClick: () => void;
    icon: ReactNode;
}


export default function TextFormat({ editorState }: TextFormatProps) {
    const { editor } = useCurrentEditor();

    const textFormatButtons: TextFormatButton[] = [
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
        // {
        //     onClick: () => editor?.chain().focus().toggleCode().run(),
        //     icon: <Link size={20} color={editorState.isCode ? '#0000ff' : '#000'} />,
        // },
    ]

    return (
        <div className="grid grid-cols-5 items-center justify-between gap-1.5">
            {
                textFormatButtons.map(textFormatButton => {
                    return <button
                        className="cursor-pointer hover:bg-gray-200 rounded-lg py-1 px-0.5
                        flex justify-center"
                        onClick={textFormatButton.onClick}
                    >
                        {textFormatButton.icon}
                    </button>
                })
            }
            {/* <button
                className="cursor-pointer hover:bg-gray-200 rounded-lg p-0.5
                bg-gradient-to-b from-red-600 via-orange-400 via-yellow-400 via-green-500 
                to-cyan-500"
                title="Background color"
            >
                <div className="w-6 bg-white rounded-md">
                    <span 
                        className="text-2xl leading-none
                        bg-gradient-to-b from-red-600 via-orange-400 via-yellow-400 
                        via-green-500 to-cyan-500 bg-clip-text text-transparent"
                    >
                        B
                    </span>
                </div>
            </button> */}
        </div>
    )
}