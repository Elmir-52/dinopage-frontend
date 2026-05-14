import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import './_NoteTab.scss';
import { useAppSelector } from '../../hook';
import type { Note } from '../../shared/types/note';

export default function NoteTab() {
    const requiredNote: Note = useAppSelector(state => state.requiredNoteReducer.requiredNote);
    const navigate = useNavigate()

    async function deleteNote() {
        try {
            const res = await fetch('http://localhost:3000/api/notes/note', {
                    method: 'DELETE',
                    body: JSON.stringify(requiredNote.note_id),
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
        <div className="note-tab">
            <Button onClick={() => { navigate('/') }} className="note-tab__button">
                <img src="/logo-app.png" title="на главную"/>
            </Button>
            <Button onClick={() => deleteNote()} className="note-tab__button">
                <img src="/delete-icon.png" title="удалить"/>
            </Button>
        </div>
    );
}