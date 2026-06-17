import './NoteCard.scss'
import { useNavigate, type NavigateFunction } from 'react-router';
import type { Note } from '../../shared/types/note';

interface PropsButtonNote {
    content: Note,
}

export default function NoteCard({ content }: PropsButtonNote) {
    const navigate: NavigateFunction = useNavigate();

    const updatedAtRaw: Date = new Date(content.updatedAt);
    const MONTHS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const updatedAt: string = `${updatedAtRaw.getDate()} ${MONTHS[updatedAtRaw.getMonth()]} ${updatedAtRaw.getFullYear()}`;

    return(
        <button 
            className='note-card'
            onClick={() => { 
                navigate(`/notes/${content.noteId}`);
            }} 
        >
            <div className='note-card__wrap'>
                <div className='note-card__header' style={{ backgroundColor: `${content.color}40`, }}></div>
                <p 
                    className={content.title ? 'note-card__title' : 'note-card__title note-card__title_untitled'}
                >{content.title ? content.title : 'Untitled note'}</p>
            </div>
            <p className='note-card__date'>{updatedAt}</p>
        </button>
    )
}