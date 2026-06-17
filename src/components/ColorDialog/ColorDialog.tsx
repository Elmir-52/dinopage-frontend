import { COLOR_BUTTONS } from "../../shared/data/colorButtons";
import './ColorDialog.scss'
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { $patchStyleText } from "@lexical/selection";
import { useRef } from "react";

interface ColorDialogProps {
    dialogVisibility: boolean;
    changeDialogVisibiloty: (visibility: boolean) => void;
}

export default function ColorDialog({ dialogVisibility, changeDialogVisibiloty }: ColorDialogProps) {
    const [editor] = useLexicalComposerContext();
    const dialog = useRef<HTMLDialogElement| null>(null);

    if (dialogVisibility) {
        dialog.current?.show();
    } else {
        dialog.current?.close();
    }

    function applyColor(color: string) {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, { color });
            }
        })
    }
    
    return(
        <dialog ref={dialog} className="set-color-dialog">
            <ul>{
                COLOR_BUTTONS.map(colorButton => {
                    return <li key={colorButton.text}>
                        <button 
                            onClick={() => {
                                applyColor(colorButton.textColor);
                                changeDialogVisibiloty(false);
                            }} 
                            style={{backgroundColor: colorButton.textColor}}
                            title={colorButton.textColor}
                        ></button>
                    </li>
                })    
            }</ul>
        </dialog>
    );
}