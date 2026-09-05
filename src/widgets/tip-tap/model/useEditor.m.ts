import { TextStyleKit } from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";
import { CustomHeading } from "../lib/tiptapExtensions/custom-heading";
import Code from "@tiptap/extension-code";
import { Note } from "@/shared/model";
import { TabExtension } from "../lib/tiptapExtensions/tab-extension";

export function useEditorModel(note: Note | undefined) {
    const noteTitleInputRef = useRef<HTMLInputElement | null>(null);

    const editor = useEditor({
        extensions: [
            TextStyleKit,
            StarterKit.configure({
                // Отключаем встроенный heading, чтобы он не конфликтовал с CustomHeading
                heading: false,
            }),
            CustomHeading,

            Code.configure({
                HTMLAttributes: {
                    class: 'bg-gray-200 px-2 py-[1px] border-solid border-black rounded-md text-red-600',
                },
            }),
            TabExtension
        ],
        editorProps: {
            attributes: {
                class: 'bg-white w-full min-h-full px-15 py-3 pb-50 focus:outline-0'
            },
        },
        immediatelyRender: false,
        content: note?.content ? JSON.parse(note.content) : '',
    }, [note]);

    useEffect(() => {
        if (noteTitleInputRef.current) {
            noteTitleInputRef.current.value = note?.title ?? '';
        }
    }, [note]);

    return {
        editor,
        noteTitleInputRef
    }
}