import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import './_NoteTab.scss';
import { useAppSelector } from '../../hook';
import { ref, set } from 'firebase/database';
import { db } from '../../../lib/fierbase';
import { deleteDb } from '../../fetchRequestDB';

export default function NoteTab() {
    const noteId = useAppSelector(state => state.noteIdReducer.noteId);
    const requiredNote = useAppSelector(state => state.requiredNoteReducer.requiredNote);
    const navigate = useNavigate();
    console.log(requiredNote);

    const refToRequiredNote = ref(db, `/notes/${noteId}`);

    function saveNote() {
        set(refToRequiredNote, requiredNote);
        navigate('/');
    }

    function deleteNote() {
        deleteDb(refToRequiredNote);
        navigate('/');
    }

    return(
        <div className="note-tab">
            <Button onClick={() => saveNote()} className="note-tab__button">
                <img src="/floppy-icon.webp" title="сохранить"/>
            </Button>
            <Button onClick={() => { navigate('/') }} className="note-tab__button">
                <img src="/logo-app.png" title="на главную"/>
            </Button>
            <Button onClick={() => deleteNote()} className="note-tab__button">
                <img src="/delete-icon.png" title="удалить"/>
            </Button>
        </div>
    );
}