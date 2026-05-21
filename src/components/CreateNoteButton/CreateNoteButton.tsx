import logoAdd from '/logoAdd.svg';
import './CreateNoteButton.scss';

interface PropsButtonNoteAdd {
    onClick: (open: boolean) => void;
}

export default function ButtonNoteAdd({ onClick }: PropsButtonNoteAdd) {
    return(
        <button onClick={() => onClick(true)} className='create-note' title='Создать заметку'>
            <img className='create-note__image' src={logoAdd} alt="Иконка добавления" />
        </button>
    )
}