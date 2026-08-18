import { baseRequest, HttpError } from "@/shared/api";
import { UpdateNoteDto } from "../model/updateNote";

export async function updateNoteRequest(
    noteId: string,
    updateNoteDto: UpdateNoteDto
): Promise<void> {
    try {
        const response = await baseRequest<UpdateNoteDto>({
            url: `${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`,
            method: 'PATCH',
            body: updateNoteDto
        });

        if (!response.ok) throw new Error();

        return;
    } catch(error) {
        if (error instanceof HttpError) {
            if (error.status === 401) {
                throw new HttpError(401, "Unauthorized: the note hasn't been saved");
            }
        }

        throw new Error("The note hasn't been saved, save the note locally to your device, and try again later");
    }
}