'use client'

import type { Note } from '../../shared/types/note';
import { MONTHS } from '../../shared/data/months';
import Link from 'next/link';

interface PropsButtonNote {
    content: Note,
}

export default function NoteCard({ content }: PropsButtonNote) {
    const updatedAtRaw: Date = new Date(content.updatedAt);
    const updatedAt: string = `${updatedAtRaw.getDate()} ${MONTHS[updatedAtRaw.getMonth()]} ${updatedAtRaw.getFullYear()}`;

    return(
        <Link 
            href={`/notes/${content.noteId}`}
            prefetch={false}
            className='flex flex-col justify-between items-center w-full h-45 p-2 cursor-pointer 
            rounded-2xl shadow-xl bg-white transition-transform hover:scale-104'
        >
            <div className='w-full'>
                <div 
                    className='w-full h-6 rounded-2xl mb-2.5' 
                    style={{ backgroundColor: `${content.color}40`, }}
                />

                <p 
                    className={content.title ? 
                        'w-full h-13 mx-auto text-left text-[18px] font-semibold overflow-hidden' : 
                        'w-full h-13 mx-auto text-left text-[18px] font-semibold overflow-hidden text-black/40'
                    }
                >
                    {content.title ? content.title : 'Untitled note'}
                </p>

            </div>

            <p className='text-gray-400'>{updatedAt}</p>
        </Link>
    )
}