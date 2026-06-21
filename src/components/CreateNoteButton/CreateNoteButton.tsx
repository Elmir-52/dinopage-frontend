import logoAdd from '/logoAdd.svg';

interface PropsButtonNoteAdd {
    onClick: (open: boolean) => void;
}

export default function ButtonNoteAdd({ onClick }: PropsButtonNoteAdd) {
    return(
        <button 
            onClick={() => onClick(true)} 
            className='flex justify-center items-center w-20 h-15 cursor-pointer shadow-2xl 
            overflow-hidden bg-white rounded-2xl transition-transform duration-100 m-auto 
            hover:scale-105' 
            title='Создать заметку'
        >
            <img 
                className='w-8' 
                src={logoAdd} 
                alt="Иконка добавления" />
        </button>
    )
}