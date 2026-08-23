export interface UpdateNoteDto {
    title: string;
    content: string;
}

export function buildUpdateNoteDto(
    title: string | undefined,
    content: string
): UpdateNoteDto {
    return {
        title: title ? title : '',
        content,
    }
}