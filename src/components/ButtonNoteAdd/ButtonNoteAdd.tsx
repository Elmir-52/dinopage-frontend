import logoAdd from '/logoAdd.svg';
import './_ButtonNoteAdd.scss';

interface PropsButtonNoteAdd {
    onClick: (open: boolean) => void;
}

export default function ButtonNoteAdd({ onClick }: PropsButtonNoteAdd) {
    return(
        <button onClick={() => onClick(true)} className='button-note-add'>
            <img className='button-note-add__image' src={logoAdd} alt="Иконка добавления" />
        </button>
    )
}