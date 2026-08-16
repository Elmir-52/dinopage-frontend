import { NOTE_CARD_BACKGROUNDS } from "./noteCardBackgrounds";

export function randomColor(min: number, max: number) {
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    return NOTE_CARD_BACKGROUNDS[index];
}