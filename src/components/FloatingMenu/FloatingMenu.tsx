import { useCallback, useEffect, useState } from "react";
import TextBlockList from "../TextBlockList/TextBlockList";
import TextColor from "../TextColor/TextColor";
import TextStyleButtons from "../TextStyleButtons/TextStyleButtons";
import './FloatingMenu.scss';
import { $findMatchingParent, $getSelection, $isRangeSelection, $isRootOrShadowRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import{ $isHeadingNode } from '@lexical/rich-text';
import { mergeRegister } from "@lexical/utils";

export default function FloatingMenu() {
    const [editor] = useLexicalComposerContext();
    const [blockType, setBlockType] = useState('paragraph');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isCode, setIsCode] = useState(false);

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const anchorNode = selection.anchor.getNode();
            let topLevelElement = $findMatchingParent(anchorNode, e => {
                const parent = e.getParent();
                return parent !== null && $isRootOrShadowRoot(parent);
            });
            
            if (topLevelElement === null) {
                topLevelElement = anchorNode.getTopLevelElementOrThrow();
            }

            if ($isHeadingNode(topLevelElement)) {
                setBlockType(topLevelElement.getTag());
            } else {
                setBlockType(topLevelElement.getType());
            }
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
            setIsCode(selection.hasFormat('code'));
        }
    }, []);

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(
                    () => {
                        $updateToolbar();
                    },
                    {editor},
                );
            })
        );
    }, [editor, $updateToolbar]);

    return(
        <div className="floating-menu">
            <TextBlockList blockType={blockType}/>
            <TextStyleButtons 
                isBold={isBold} 
                isItalic={isItalic}
                isUnderline={isUnderline}
                isStrikethrough={isStrikethrough}
                isCode={isCode}
            />
            <TextColor />
        </div>
    );
}