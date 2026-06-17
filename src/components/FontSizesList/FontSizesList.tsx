import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $patchStyleText } from "@lexical/selection";
import { $getSelection, $isRangeSelection } from "lexical";
import { FONT_SIZE_LIST, type FontSizeListElement } from "../../shared/data/fontSizeList";

export default function FontSizesList() {
    const [editor] = useLexicalComposerContext();

    function applyFontSize(size: string) {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $patchStyleText(selection, {
                    'font-size': size,
                });
            }
        });
    };

    return (
        <>
            <select onChange={(e) => applyFontSize(e.target.value)}>
                {
                    FONT_SIZE_LIST.map((el: FontSizeListElement) => {
                        return <option key={el.name} value={el.value}>{el.name}</option>
                    })
                }
            </select>
        </>
    );
}