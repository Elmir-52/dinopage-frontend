'use client'

import { useCallback, useEffect, useState  } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { CreateNote, Note } from "@/shared/types/note";
import { randomColor } from "@/utils/randomColor";
import { NOTE_CARD_BACKGROUNDS } from "@/shared/data/noteCardBackgrounds";
import MessageModal from "@/components/MessageModal/MessageModal";
import { MessageModalState } from "@components/MessageModal/MessageModal.types";
import { baseRequest, HttpError } from "@/shared/api";
import { PagePaths } from "@/shared/model";
import CreateNoteButton from "../CreateNoteButton/CreateNoteButton";
import { Modal } from "@/shared/ui";


// NoteCard импортируется динамически без ssr, ибо внутри него есть код создания даты,
// при разных часовых поясах будет ошибка гидратации
const DynamicNoteCard = dynamic(() => import('../NoteCard/NoteCard'), {
    ssr: false,
});

export default function NoteList() {
    const router = useRouter();
    const [rerender, setRerender] = useState<boolean>(false);
    const [result, setResult] = useState<Note[] | undefined>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [messageModalState, setMessageModalState] = useState<MessageModalState>({
        isOpen: false,
        message: '',
    });

    useEffect(() => {
        async function getUserNotes() {
            try {
                const response = await baseRequest({
                    url: `${process.env.NEXT_PUBLIC_API_URL}/notes`,
                    method: 'GET'
                })

                if (!response.ok) throw new Error();

                const notes: Note[] = await response.json();
                setResult(notes);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        router.push(PagePaths.LOGIN);
                        return;
                    }
                }

                setMessageModalState({
                    isOpen: true,
                    message: 'Something went wrong, please try again later',
                    onClick: toggleRerender
                });
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
            const response = await baseRequest<CreateNote>({
                url: `${process.env.NEXT_PUBLIC_API_URL}/notes`,
                method: 'POST',
                body: newNote
            });

            if (!response.ok) throw new Error();

            toggleRerender();
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    router.push(PagePaths.LOGIN);
                    return;
                }
            }

            setMessageModalState({
                isOpen: true,
                message: "A note hasn't been created, please try again later"
            });
        }
    }, []);

    function toggleRerender() {
        setRerender(prev => !prev);
    }

    function toggleIsMessageModalOpen(isOpen: boolean) {
        setMessageModalState(prev => ({ 
            ...prev, 
            isOpen
        }));
    }
        
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
                message={messageModalState.message}
                isMessageModalOpen={messageModalState.isOpen}
                setIsMessageModalOpen={toggleIsMessageModalOpen}
                onClick={messageModalState.onClick}
            />
        </section>
    );
}