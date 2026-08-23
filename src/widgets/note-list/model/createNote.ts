import { NOTE_CARD_BACKGROUNDS } from "../lib/noteCardBackgrounds";
import { randomColor } from "../lib/randomColor";

export interface CreateNoteDto {
    title: string;
    content: string;
    color: string;
}

export function buildCreateNoteDto(): CreateNoteDto {
    return {
        title: '',
        content: '',
        color: randomColor(0, NOTE_CARD_BACKGROUNDS.length - 1)
    }
}