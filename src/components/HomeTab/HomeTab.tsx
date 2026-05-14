import './HomeTab.scss';
import { useState } from 'react';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import ColorDialog from '../ColorDialog/ColorDialog';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../hook';
import type { Note } from '../../shared/types/note';

export default function HomeTab() {
    const [editor] = useLexicalComposerContext();
    const [colorDialogVisibility, setColorDialogVisibility] = useState<boolean>(false);
    const navigate = useNavigate();
    const requiredNote: Note = useAppSelector(state => state.requiredNoteReducer.requiredNote);
    
    async function saveNote() {
        try {
            const res = await fetch('http://localhost:3000/api/notes/note', {
                method: 'PUT',
                body: JSON.stringify(requiredNote),
            });

            if (res.ok) {
                navigate('/');
            } else {
                const message = res.json();
                throw new Error(`${message}`);
            }
        } catch(error) {
            const err = error as Error;
            console.error(err.message);
        }
    }

    return(
        <div className="home-tab">
            <button 
                className="home-tab__button" 
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
            >
                B
            </button>
            <button 
                className="home-tab__button" 
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
            >
                <em>I</em>
            </button>
            <button 
                className="home-tab__button" 
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
            >
                <u>U</u>
            </button>
            
            <div className='home-tab__color-text'>
                <button onClick={() => setColorDialogVisibility(prev => !prev)}>Color</button>
                <ColorDialog 
                    dialogVisibility={colorDialogVisibility}
                    changeDialogVisibiloty={(visibility: boolean) => setColorDialogVisibility(visibility)}
                />
            </div>

            <button onClick={() => saveNote()} className="home-tab__save">
                <img src="/floppy-icon.webp" title="сохранить"/>
            </button>
        </div>
    );
}