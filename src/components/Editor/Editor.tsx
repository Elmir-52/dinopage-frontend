import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer';
import { defineExtension } from 'lexical';
import { RichTextExtension } from '@lexical/rich-text'
import { HistoryExtension } from '@lexical/history'
import { TabIndentationExtension } from '@lexical/extension'
import './Editor.scss';
import LoadFromBackendPlugin from '../../plugins/LoadFromBackendPlugin';
import type { Note } from '../../shared/types/note';
import { useEffect, useRef } from 'react';
import FloatingMenuPlugin from '../../plugins/FloatingMenuPlugin';
import FloatingMenu from '../FloatingMenu/FloatingMenu';
import EditorBar from '../EditorBar/EditorBar';

interface EditorProps {
    note: Note
}

const theme = {
    text: {
        bold: 'bold',
        italic: 'italic',
        underline: 'underline',
        strikethrough: 'strikethrough',
        code: 'code'
    }
}

const extension = defineExtension({
    name: "[root]",
    dependencies: [RichTextExtension, HistoryExtension, TabIndentationExtension],
    theme,
})

export default function Editor({ note }: EditorProps) {
    const noteTitleInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (noteTitleInputRef.current) {
            noteTitleInputRef.current.value = note.title;
        }
    }, []);
    
    return(
        <LexicalExtensionComposer
            extension={extension}
            contentEditable={null}
        >
            <div className='editor-wrapper'>
                <EditorBar noteTitleInputRef={noteTitleInputRef} />

                <div className="editor-wrapper__rich-text">
                    <input
                        ref={noteTitleInputRef}
                        className='editor-wrapper__title-input' 
                        type="text" 
                        placeholder='Note title...'
                    />

                    <ContentEditable
                        className='editor-wrapper__content-editable'
                        aria-label="Rich text editor"
                    />
                </div>
            </div>

            <FloatingMenuPlugin>
                <FloatingMenu />
            </FloatingMenuPlugin>

            <LoadFromBackendPlugin noteContent={note.content} />
        </LexicalExtensionComposer>
    );
}