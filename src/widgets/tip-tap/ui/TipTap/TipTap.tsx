'use client'

import { EditorContent, EditorContext } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { useMemo } from "react";
import NoteBar from "../NoteBar/NoteBar";
import BubbleToolbar from "../BubbleToolbar/BubbleToolbar";
import { useTipTapViewModel } from "../../model/useTipTap.vm";

export default function TipTap() {
    const {
        note,
        editor,
        noteTitleInputRef,
        updateNote,
        confirmDialog,
        updateNoteErrorDialog,
        deleteNoteErrorDialog
    } = useTipTapViewModel();

    const providerValue = useMemo(() => ({ editor }), [editor]);

    if (!note) return <p>Loading...</p>;

    return (
        <EditorContext.Provider value={providerValue}>
            <div className="flex gap-2.5 h-screen">
                <NoteBar 
                    updateNote={updateNote}
                    confirmDialog={confirmDialog}
                    updateNoteErrorDialog={updateNoteErrorDialog}
                    deleteNoteErrorDialog={deleteNoteErrorDialog}
                />

                <div
                    className="flex flex-col gap-5 w-[80%] h-[98%] m-auto rounded-3xl 
                    overflow-y-auto border-2 border-solid border-gray-200 shadow-2xl 
                    bg-white"
                >
                    <input
                        className='w-[90%] bg-white outline-0 mx-auto pt-6 pb-2 text-3xl border-b 
                        border-solid border-gray-400 font-semibold'
                        ref={noteTitleInputRef}
                        type="text"
                        placeholder='Note title'
                    />

                    <EditorContent
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