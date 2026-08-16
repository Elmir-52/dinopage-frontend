import { MessageModalState } from "@/components/MessageModal/MessageModal.types";
import { baseRequest, HttpError } from "@/shared/api";
import { PagePaths } from "@/shared/model";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { SetStateAction } from "react";

export async function deleteNoteRequest(
    id: string,
    router: AppRouterInstance,
    setMessageModalState: (value: SetStateAction<MessageModalState>) => void
) {
    try {
        const response = await baseRequest({
            url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`,
            method: 'DELETE'
        });

        if (!response.ok) throw new Error();

        router.push(PagePaths.DOCS);
    } catch(error) {
        if (error instanceof HttpError) {
            if (error.status === 401) {
                router.push(PagePaths.LOGIN);
                return;
            }
        }

        setMessageModalState({
            isOpen: true,
            message: "The note hasn't been deleted, please try again later"
        });
    }
}