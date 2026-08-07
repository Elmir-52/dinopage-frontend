'use client'

import Image from 'next/image';

interface PropsButtonNoteAdd {
    onClick: (open: boolean) => void;
}

export default function CreateNoteButton({ onClick }: PropsButtonNoteAdd) {
    return(
        <button 
            onClick={() => onClick(true)} 
            className='flex justify-center items-center w-20 h-15 cursor-pointer shadow-2xl 
            overflow-hidden bg-white rounded-2xl transition-transform duration-100 m-auto 
            hover:scale-105' 
            title='Создать заметку'
        >
            <Image 
                width={32}
                height={32}
                src="/logoAdd.svg" 
                alt="Иконка добавления" 
            />
        </button>
    )
}