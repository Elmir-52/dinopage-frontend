import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useAppSelector } from "../hook";
import { useEffect } from "react";

export default function SetContentToEditorPlugin() {
    const requiredNote = useAppSelector(state => state.requiredNoteReducer.requiredNote);
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (requiredNote.content) {
            const parsedEditor = editor.parseEditorState(requiredNote.content);
            editor.setEditorState(parsedEditor);
        }
    }, [])


    return null;
}