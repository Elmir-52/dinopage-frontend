import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useAppDispatch } from "../hook";
import { setContent } from "../store/requiredNoteSlice";
import { useEffect } from "react";

export default function GetContentFromEditorPlugin() {
    const dispatch = useAppDispatch();
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.registerUpdateListener(({editorState}) => {
            const jsonEditorState = JSON.stringify(editorState.toJSON());
            dispatch(setContent({content: jsonEditorState}));
        });
    });

    return null;
}