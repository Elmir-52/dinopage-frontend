'use client'

import TipTap from "@/components/TipTap/TipTap";
import { HttpError } from "@/errors/httpError";
import { Note } from "@/shared/types/note";
import { requestToBackend } from "@/utils/requestToBackend";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PagesPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [note, setNote] = useState<Note | undefined>(undefined);

    useEffect(() => {
        async function getNote(noteId :string) {
            try {
                let response = await requestToBackend({
                    url: `http://localhost:3000/notes/${noteId}`,
                    method: 'GET'
                });

                if (!response.ok) {
                    router.push('/docs');
                    return;
                }

                const data: Note = await response.json();
                setNote(data);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        router.push('/auth/login');
                        return;
                    }
                }
            }
        }
    
        if (id) {
            getNote(id);
        }
    }, []);

    return (
        <>
            {!note && <p>Loading...</p>}
            {note && <TipTap note={note}/>}
        </>
    )
}