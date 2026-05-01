import './_ButtonNote.scss'
import type { NoteDb } from '../../App';
import { useAppDispatch } from '../../hook';
import { useNavigate, type NavigateFunction } from 'react-router';
import { setRequedNote } from '../../store/requiredNoteSlice';

interface PropsButtonNote {
    content: NoteDb,
}

export default function ButtonNote({ content }: PropsButtonNote) {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    return(
        <button 
            onClick={() => { 
                navigate('/note-text');
                dispatch(setRequedNote({requiredNote: content}));
            }} 
            className='button-note'
        >
            <h3 className='button-note__title'>{content.title}</h3>
            <hr />
            <p className='button-note__date'>{content.date}</p>
        </button>
    )
}