'use client'

import { useEffect, useState } from "react";
import { getNotesRequest } from "../api/getNotes";
import { Note, PagePaths } from "@/shared/model";
import { buildCreateNoteDto, CreateNoteDto } from "./createNote";
import { createNoteRequest } from "../api/createNote";
import { HttpError } from "@/shared/api";
import { useRouter } from "next/navigation";

export function useNoteListModel() {
    const router = useRouter();
    const [notes, setNotes] = useState<Note[]>();
    const [getNotesError, setGetNotesError] = useState<Error>();
    const [createNoteError, setCreateNoteError] = useState<Error>();

    useEffect(() => {
        getNotes();
    }, []);

    async function getNotes() {
        try {
            const notes: Note[] = await getNotesRequest();
            setNotes(notes);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    router.push(PagePaths.LOGIN);
                    return;
                }
            }

            if (error instanceof Error) {
                setGetNotesError(error);
            }
        }
    }

    // обработчик клика для создания новой заметки и получения нового списка заметок
    async function handleCreateNote() {
        try {
            const newNote: CreateNoteDto = buildCreateNoteDto();
            await createNoteRequest(newNote);
            await getNotes();
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    router.push(PagePaths.LOGIN);
                    return;
                }
            }

            if (error instanceof Error) {
                setCreateNoteError(error)
            }
        }
    }

    return {
        notes,
        getNotes,
        handleCreateNote,
        getNotesError,
        createNoteError
    }
}