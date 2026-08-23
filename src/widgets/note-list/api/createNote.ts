import { baseRequest, HttpError } from "@/shared/api";
import { CreateNoteDto } from "../model/createNote";

export async function createNoteRequest(newNote: CreateNoteDto): Promise<void> {    
    try {
        const response = await baseRequest<CreateNoteDto>({
            url: `${process.env.NEXT_PUBLIC_API_URL}/notes`,
            method: 'POST',
            body: newNote
        });

        if (!response.ok) throw new Error();

        return;
    } catch(error) {
        if (error instanceof HttpError) {
            if (error.status === 401) {
                throw error
            }
        }

        throw new Error("A note hasn't been created, please try again later");
    }
}