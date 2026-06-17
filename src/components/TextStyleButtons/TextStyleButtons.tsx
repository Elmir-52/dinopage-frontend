import { FORMAT_TEXT_COMMAND } from "lexical";
import './TextStyleButtons.scss';
import FontSizesList from "../FontSizesList/FontSizesList";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export default function TextStyleButtons() {
    const [editor] = useLexicalComposerContext();

    return (
        <div className="text-style">
            <button 
                className="text-style__button" 
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
            >
                B
            </button>
            <button 
                className="text-style__button" 
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
            >
                <em>I</em>
            </button>
            <button 
                className="text-style__button" 
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
            >
                <u>U</u>
            </button>
            <button 
                className="text-style__button" 
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
            >
                <s>S</s>
            </button>
            <button 
                className="text-style__button" 
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
            >
                &lt;&#47;&gt; {/* символы </> */}
            </button>

            <FontSizesList />
        </div>
    );
}