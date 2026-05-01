import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer';
import { defineExtension } from 'lexical';
import { RichTextExtension } from '@lexical/rich-text'
import { HistoryExtension } from '@lexical/history'
import { TabIndentationExtension } from '@lexical/extension'
import TollBar from '../TollBar/TollBar';
import './Editor.scss';
import SetContentToEditorPlugin from '../../plugins/SetContentToEditorPlugin';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { setTitle } from '../../store/requiredNoteSlice';
import GetContentFromEditorPlugin from '../../plugins/GetContentFromEditorPlugin';
import { useNavigate } from 'react-router';
import type { Note } from '../../shared/types/note';

const theme = {
    text: {
        bold: 'bold',
        italic: 'italic',
        underline: 'underline',
    }
}

const extension = defineExtension({
    name: "[root]",
    dependencies: [RichTextExtension, HistoryExtension, TabIndentationExtension],
    theme,
})

export default function Editor() {    
    const inputElement = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const requiredNote: Note = useAppSelector(state => state.requiredNoteReducer.requiredNote);
    const navigate = useNavigate();

    useEffect(() => {
        if (requiredNote.note_id === '') {
            navigate('/');
        }
    }, []);

    return(
        <LexicalExtensionComposer
            extension={extension}
            contentEditable={null}
        >
            <TollBar />

            <div className="rich-text">
                <input 
                    onChange={(e) => dispatch(setTitle({title: e.target.value}))} 
                    value={requiredNote.title}
                    ref={inputElement} 
                    type="text" 
                    className='input-title' 
                    placeholder='Note title...'
                />

                <ContentEditable
                    className='content-editable'
                    aria-label="Rich text editor"
                    aria-placeholder="Enter some text..."
                    placeholder={
                        <div className='content-editable__placeholder'>
                            Enter some text...
                        </div>
                    }
                />
            </div>

            <SetContentToEditorPlugin />
            <GetContentFromEditorPlugin />
        </LexicalExtensionComposer>
    );
}