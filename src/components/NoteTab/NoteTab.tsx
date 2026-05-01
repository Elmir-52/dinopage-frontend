import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import './_NoteTab.scss';
import { useAppSelector } from '../../hook';
import { ref } from 'firebase/database';
import { db } from '../../../lib/fierbase';
import { deleteDb } from '../../fetchRequestDB';
import type { Note } from '../../shared/types/note';

export default function NoteTab() {
    const requiredNote: Note = useAppSelector(state => state.requiredNoteReducer.requiredNote);
    const navigate = useNavigate()

    const refToRequiredNote = ref(db, `/notes/${requiredNote.note_id}`);

    function deleteNote() {
        deleteDb(refToRequiredNote);
        navigate('/');
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