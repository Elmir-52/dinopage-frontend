import { RefObject, useState } from "react";
import { Editor } from '@tiptap/react'
import { useParams, useRouter } from "next/navigation";
import { updateNoteRequest } from "../api/updateNote";
import { deleteNoteRequest } from "../api/deleteNote";
import { buildUpdateNoteDto, UpdateNoteDto } from "./updateNote";
import { PagePaths } from "@/shared/model";
import { HttpError } from "@/shared/api";

export function useNoteBarModel(
    noteTitleInputRef: RefObject<HTMLInputElement | null>,
    editor: Editor | null
) {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [updateNoteError, setUpdateNoteError] = useState<Error>();
    const [deleteNoteError, setDeleteNoteError] = useState<Error>();

    async function updateNote() {
        const updateNoteDto: UpdateNoteDto = buildUpdateNoteDto(
            noteTitleInputRef.current?.value, 
            JSON.stringify(editor?.getJSON())
        );

        try {
            await updateNoteRequest(id, updateNoteDto);
            router.push(PagePaths.DOCS);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    setUpdateNoteError(new Error(error.message));
                }
            }

            if (error instanceof Error) {
                setUpdateNoteError(error);
            }
        }
    }

    async function deleteNote() {
        try {
            await deleteNoteRequest(id);
            router.push(PagePaths.DOCS);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    router.push(PagePaths.LOGIN)
                }
            }

            if (error instanceof Error) {
                setDeleteNoteError(error);
            }
        }
    }

    return {
        updateNote,
        deleteNote,
        updateNoteError,
        deleteNoteError
    }
}