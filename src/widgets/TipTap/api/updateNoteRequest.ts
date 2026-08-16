import { baseRequest, HttpError } from "@/shared/api";
import { UpdateNote } from "../model/updateNote";
import { PagePaths } from "@/shared/model";
import { SetStateAction } from "react";
import { MessageModalState } from "@/components/MessageModal/MessageModal.types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function updateNoteRequest(
    id: string,
    title: string | undefined, 
    content: string,
    router: AppRouterInstance,
    setMessageModalState: (value: SetStateAction<MessageModalState>) => void
): Promise<void> {
    const updateNote: UpdateNote = {
        title: title ? title : '',
        content,
    }

    try {
        const response = await baseRequest<UpdateNote>({
            url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
            method: 'PATCH',
            body: updateNote
        });

        if (!response.ok) throw new Error();

        router.push(PagePaths.DOCS);
    } catch(error) {
        if (error instanceof HttpError) {
            if (error.status === 401) {
                setMessageModalState({
                    isOpen: true,
                    message: "Unauthorized: the note hasn't been saved"
                });
                return;
            }
        }

        setMessageModalState({
            isOpen: true,
            message: "The note hasn't been saved, save the note locally to your device, and try again later"
        });
    }
}