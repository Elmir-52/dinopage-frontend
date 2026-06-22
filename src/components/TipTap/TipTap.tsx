import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";

export default function TipTap() {
    const editor = useEditor({
        extensions: [StarterKit],
        editorProps: {
            attributes: {
                class: 'bg-white w-[80%] h-[90vh] px-7 py-3 focus:outline-0'
            }
        },
        content: '<p></p>'
    });

    const providerValue = useMemo(() => ({ editor }), [editor]);

    return (
        <EditorContext.Provider value={providerValue}>
            <EditorContent 
                editor={editor}
            />
            <FloatingMenu editor={editor}>
                <button className="relative -left-6">
                    +
                </button>
            </FloatingMenu>
            <BubbleMenu editor={editor}>This is bubble menu</BubbleMenu>
        </EditorContext.Provider>
    )
}