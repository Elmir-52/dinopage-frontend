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
            className='note-card'
            onClick={() => { 
                navigate('/note-text');
                dispatch(setRequedNote({requiredNote: content}));
            }} 
        >
            <div className='note-card__wrap'>
                <div className='note-card__header' style={{backgroundColor: content.backgroundColor}}></div>
                <p className='note-card__title'>{content.title}</p>
            </div>
            <p className='note-card__date'>{content.date}</p>
        </button>
    )
}