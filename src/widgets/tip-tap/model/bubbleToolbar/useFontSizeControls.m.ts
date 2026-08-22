import { Editor } from '@tiptap/react';
import { useEffect, useState } from 'react';

type ChangeFontSizeEvent = React.FocusEvent<HTMLInputElement, Element> | React.ChangeEvent<HTMLSelectElement>;

export function useFontSizeControlsModel(editor: Editor) {
    const [currentFontSize, setCurrentFontSize] = useState<string | undefined>();
    
    useEffect(() => {
        function handleSelection() {
            const fontSize = editor?.getAttributes('textStyle').fontSize;
            if (!fontSize) {
                setCurrentFontSize('16');
                return;
            }
            setCurrentFontSize(fontSize?.slice(0, -2));
        }

        editor?.on('selectionUpdate', handleSelection);
        
        return () => {
            editor?.off('selectionUpdate', handleSelection);
        }
    }, [editor]);

    function changeFontSize(event: ChangeFontSizeEvent) {
        // если user решил поставить выделенному тексту 16px то у него просто 
        // уберётся font-size inline-style, так как 16px это дефолтный размер текста
        if (event.target.value === '16') {
            editor?.chain().focus().unsetFontSize().run();
        } else {
            editor?.chain().focus().setFontSize(`${event.target.value}px`).run();
        }
    }

    return {
        currentFontSize,
        setCurrentFontSize,
        changeFontSize
    }
}

type FontSizeControlsModel = ReturnType<typeof useFontSizeControlsModel>;
export type SetCurrentFontSize = FontSizeControlsModel['setCurrentFontSize'];
export type ChangeFontSize = FontSizeControlsModel['changeFontSize'];