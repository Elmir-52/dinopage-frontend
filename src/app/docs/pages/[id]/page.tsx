'use client'

import TipTap from "@/components/TipTap/TipTap";
import { baseRequest, HttpError } from "@/shared/api";
import { Paths } from "@/shared/enums/paths.enum";
import { Note } from "@/shared/types/note";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PagesPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [note, setNote] = useState<Note | undefined>(undefined);

    useEffect(() => {
        async function getNote(noteId :string) {
            try {
                let response = await baseRequest({
                    url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`,
                    method: 'GET'
                });

                if (!response.ok) {
                    router.push(Paths.DOCS);
                    return;
                }

                const data: Note = await response.json();
                setNote(data);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        router.push(Paths.LOGIN);
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