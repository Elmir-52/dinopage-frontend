import { baseRequest, HttpError } from "@/shared/api";

export async function deleteNoteRequest(noteId: string) {
    try {
        const response = await baseRequest({
            url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`,
            method: 'DELETE'
        });

        if (!response.ok) throw new Error();

        return;
    } catch(error) {
        if (error instanceof HttpError) {
            if (error.status === 401) {
                throw error;
            }
        }

        throw new Error("The note hasn't been deleted, please try again later");
    }
}