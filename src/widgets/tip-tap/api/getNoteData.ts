import { baseRequest } from "@/shared/api";
import { Note } from "@/shared/model";

export async function getNoteDataRequest(noteId :string): Promise<Note> {
    let response = await baseRequest({
        url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`,
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error();
    }

    return response.json();
}