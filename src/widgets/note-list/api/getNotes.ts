import { baseRequest, HttpError } from "@/shared/api";
import { Note } from "@/shared/model";

export async function getNotesRequest(): Promise<Note[]> {
    try {
        const response = await baseRequest({
            url: `${process.env.NEXT_PUBLIC_API_URL}/notes`,
            method: 'GET'
        })

        if (!response.ok) throw new Error();

        return response.json();
    } catch(error) {
        if (error instanceof HttpError) {
            if (error.status === 401) {
                throw error;
            }
        }

        throw new Error('Something went wrong, please try again later');
    }
}