import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import TextStyleButtons from "../TextStyleButtons/TextStyleButtons";
import './FloatingMenu.scss';

export default function FloatingMenu() {
    const [editor] = useLexicalComposerContext();

    return(
        <div className="floating-menu">
            <TextStyleButtons editor={editor} />
        </div>
    );
}