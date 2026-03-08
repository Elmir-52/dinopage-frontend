import './_ButtonNote.scss'
import type { NoteDb } from '../../App';
import { useAppDispatch } from '../../hook';
import { setNoteId, type NoteIdActionPayload } from '../../store/noteIdSlice';
import { useNavigate, type NavigateFunction } from 'react-router';

interface PropsButtonNote {
    content: NoteDb,
}

export default function ButtonNote({ content }: PropsButtonNote) {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const noteIdActionPayload: NoteIdActionPayload = {
        id: content.note_id,
    }

    return(
        <button onClick={() => { navigate('/note-text'); dispatch(setNoteId(noteIdActionPayload)) }} className='button-note'>
            <h3 className='button-note__title'>{content.title}</h3>
            <hr />
            <p className='button-note__date'>{content.date}</p>
        </button>
    )
}