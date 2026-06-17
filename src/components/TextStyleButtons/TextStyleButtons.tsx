import { FORMAT_TEXT_COMMAND, type LexicalEditor } from "lexical";
import './TextStyleButtons.scss';

interface TextEditButtonsProps {
    editor: LexicalEditor
}

export default function TextStyleButtons({ editor }: TextEditButtonsProps) {
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
        </div>
    );
}