'use client'

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from '@tiptap/extension-text-style';
import { useEffect, useMemo, useRef } from "react";
import Code from "@tiptap/extension-code";
import NoteBar from "./components/NoteBar/NoteBar";
import BubbleToolbar from "./components/BubbleToolbar/BubbleToolbar";
import { CustomHeading } from "./extensions/custom-heading";
import { Note } from "@/shared/types/note";

interface TipTapProps {
    note: Note
}

export default function TipTap({ note }: TipTapProps) {
    const noteTitleInputRef = useRef<HTMLInputElement | null>(null);
    const editorContentRef = useRef<HTMLDivElement | null>(null);

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
        ],
        editorProps: {
            attributes: {
                class: 'bg-white w-full min-h-full px-15 py-3 pb-50 focus:outline-0'
            },
        },
        content: note.content ? JSON.parse(note.content) : '',
        immediatelyRender: false,
    });

    const providerValue = useMemo(() => ({ editor }), [editor]);

    useEffect(() => {
        if (noteTitleInputRef.current) {
            noteTitleInputRef.current.value = note.title;
        }
    }, []);

    return (
        <EditorContext.Provider value={providerValue}>
            <div className="flex gap-2.5 h-screen">
                <NoteBar noteTitleInputRef={noteTitleInputRef}/>

                <div
                    className="flex flex-col gap-5 w-[80%] h-[98%] m-auto rounded-3xl 
                    overflow-y-auto border-2 border-solid border-gray-200 shadow-2xl 
                    bg-white"
                >
                    <input
                        id="title"
                        className='w-[90%] bg-white outline-0 mx-auto pt-6 pb-2 text-3xl border-b 
                        border-solid border-gray-400 font-semibold'
                        ref={noteTitleInputRef}
                        type="text"
                        placeholder='Note title'
                    />

                    <EditorContent
                        ref={editorContentRef}
                        id="editor-content"
                        editor={editor}
                        className="w-full min-h-full"
                    />

                    {
                        editor &&
                        <BubbleMenu className="z-10" editor={editor}>
                            <BubbleToolbar editor={editor} />
                        </BubbleMenu>
                    }
                </div>
            </div>
        </EditorContext.Provider>
    )
}