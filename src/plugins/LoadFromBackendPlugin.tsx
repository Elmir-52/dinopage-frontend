import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function LoadFromBackendPlugin({ noteContent }: { noteContent: string }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (noteContent) {
            const parsedEditor = editor.parseEditorState(noteContent);
            editor.setEditorState(parsedEditor);
        }
    }, [])


    return null;
}