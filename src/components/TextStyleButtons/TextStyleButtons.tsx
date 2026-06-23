import { $createTextNode, $getSelection, $isRangeSelection, $isTextNode, FORMAT_TEXT_COMMAND } from "lexical";
import './TextStyleButtons.scss';
import FontSizesList from "../FontSizesList/FontSizesList";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodeToNearestRoot } from "@lexical/utils";

interface TextStyleButtonsProps {
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    isStrikethrough: boolean,
    isCode: boolean;
}

export default function TextStyleButtons({ 
    isBold, 
    isItalic, 
    isUnderline,
    isStrikethrough,
    isCode
}: TextStyleButtonsProps) {
    const [editor] = useLexicalComposerContext();

    function codeTextStyle() {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                selection.getNodes().forEach(node => {
                    if ($isTextNode(node) && node.getFormat() !== 16) {
                        node.setStyle('');
                        node.setFormat(0);
                    }
                });
                // const textNode = $createTextNode(' '); сделать кастомный $createSpanNode
                // $insertNodeToNearestRoot(textNode);
            }
        })
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
    }

    return (
        <div className="text-style">
            <button 
                className={isBold ? "text-style__button text-style__button_active" : "text-style__button"}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
            >
                B
            </button>
            <button 
                className={isItalic ? "text-style__button text-style__button_active" : "text-style__button"}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
            >
                <em>I</em>
            </button>
            <button 
                className={isUnderline && !isStrikethrough ? "text-style__button text-style__button_active" : "text-style__button"}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
            >
                <u>U</u>
            </button>
            <button 
                className={isStrikethrough ? "text-style__button text-style__button_active" : "text-style__button"}
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
            >
                <s>S</s>
            </button>
            <button 
                className={isCode ? "text-style__button text-style__button_active" : "text-style__button"}
                onClick={codeTextStyle}
            >
                &lt;&#47;&gt; {/* символы </> */}
            </button>

            <FontSizesList />
        </div>
    );
}