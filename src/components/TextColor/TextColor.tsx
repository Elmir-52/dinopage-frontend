import { COLOR_BUTTONS } from "../../shared/data/colorButtons";
import './TextColor.scss'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $patchStyleText } from "@lexical/selection";

export default function TextColor() {
    const [editor] = useLexicalComposerContext();

    function applyColor(color: string) {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, { 
                    color
                });
            }
        })
    }
    
    return(
        <div className="text-color">
            {
                COLOR_BUTTONS.map(colorButton => {
                    return <button 
                        key={colorButton.text}
                        onClick={() => applyColor(colorButton.textColor)} 
                        style={{backgroundColor: colorButton.textColor}}
                        title={colorButton.textColor}
                    ></button>
                })    
            }
        </div>
    );
}