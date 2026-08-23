import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getNoteDataRequest } from "../api/getNoteData";
import { Note, PagePaths } from "@/shared/model";
import { HttpError } from "@/shared/api";

export function useGetNoteDataModel() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [note, setNote] = useState<Note | undefined>();

    useEffect(() => {
        async function getNoteById(noteId: string) {
            try {
                const data: Note = await getNoteDataRequest(noteId);
                setNote(data);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        router.push(PagePaths.LOGIN);
                        return;
                    }
                }
                
                router.push(PagePaths.DOCS);
            }
        }
    
        getNoteById(id);
    }, []);

    return { note };
}