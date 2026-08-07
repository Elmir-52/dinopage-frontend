'use client'

import { useCallback, useEffect, useState  } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { CreateNote, Note } from "@/shared/types/note";
import { requestToBackend } from "@/utils/requestToBackend";
import { HttpError } from "@/errors/httpError";
import { randomColor } from "@/utils/randomColor";
import { NOTE_CARD_BACKGROUNDS } from "@/shared/data/noteCardBackgrounds";
import CreateNoteButton from "@/components/CreateNoteButton/CreateNoteButton";
import MessageModal, { MessageModalOnClick } from "@/components/MessageModal/MessageModal";
import Modal from "@/components/Modal/Modal";

// NoteCard импортируется динамически без ssr, ибо внутри него есть код создания даты,
// при разных часовых поясах будет ошибка гидратации
const DynamicNoteCard = dynamic(() => import('@/components/NoteCard/NoteCard'), {
    ssr: false,
});

export default function HomeSection() {
    const router = useRouter();
    const [rerender, setRerender] = useState<boolean>(false);
    const [result, setResult] = useState<Note[] | undefined>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
    const [messageModalMessage, setMessageModalMessage] = useState<string>('');
    const [messageModalOnClick, setMessageModalOnClick] = useState<MessageModalOnClick>(() => () => {});

    useEffect(() => {
        async function getUserNotes() {
            try {
                const response = await requestToBackend({
                    url: 'http://localhost:3000/notes',
                    method: 'GET'
                })

                if (!response.ok) throw new Error();

                const notes: Note[] = await response.json();
                setResult(notes);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        router.push('/login');
                        return;
                    }
                }

                setMessageModalMessage("Something went wrong, please try again later");
                setMessageModalOnClick(() => () => {});
                setIsMessageModalOpen(true);
            }
        }

        getUserNotes();
    }, [rerender]);

    const createNote = useCallback<() => void>(async () => {
        const newNote: CreateNote = {
            title: '',
            content: '',
            color: randomColor(0, NOTE_CARD_BACKGROUNDS.length - 1),
        }
        
        try {
            const response = await requestToBackend<CreateNote>({
                url: 'http://localhost:3000/notes',
                method: 'POST',
                body: newNote
            });

            if (!response.ok) throw new Error();

            setRerender(prev => !prev);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    router.push('/login');
                    return;
                }
            }

            setMessageModalMessage("A note hasn't been created, please try again later");
            setMessageModalOnClick(() => () => {});
            setIsMessageModalOpen(true);
        }
    }, []);

        
    return (
        <section className="grid grid-cols-[repeat(auto-fill,150px)] justify-center items-center 
        gap-7 w-[90%] mx-auto mb-12">
            {
                result?.map(el => {
                    return <DynamicNoteCard key={el.noteId} content={el}></DynamicNoteCard>
                })
            }

            <CreateNoteButton onClick={(open: boolean) => setIsModalOpen(open)}></CreateNoteButton>
            
            <Modal
                message="Create new note"
                isModalOpen={isModalOpen}
                setIsModalOpen={(open: boolean) => setIsModalOpen(open)}
                onClick={() => createNote()}
            />

            <MessageModal
                message={messageModalMessage}
                isMessageModalOpen={isMessageModalOpen}
                setIsMessageModalOpen={(open: boolean) => setIsMessageModalOpen(open)}
                onClick={() => messageModalOnClick()}
            />
        </section>
    );
}