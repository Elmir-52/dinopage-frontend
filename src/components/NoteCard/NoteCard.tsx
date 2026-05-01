import './NoteCard.scss'
import { useAppDispatch } from '../../hook';
import { useNavigate, type NavigateFunction } from 'react-router';
import { setRequedNote } from '../../store/requiredNoteSlice';
import type { Note } from '../../shared/types/note';

interface PropsButtonNote {
    content: Note,
}

export default function NoteCard({ content }: PropsButtonNote) {
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    return(
        <button 
            style={{backgroundColor: content.backgroundColor}}
            onClick={() => { 
                navigate('/note-text');
                dispatch(setRequedNote({requiredNote: content}));
            }} 
            className='note-card'
        >
            <div className='note-card__line'></div>
            <div className="note-card__label">
                <p className='note-card__title'>{content.title}</p>
            </div>
        </button>
    )
}