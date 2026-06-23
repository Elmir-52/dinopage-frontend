import type { Editor, EditorStateSnapshot } from "@tiptap/react";

export function subBubbleMenuStateSelector(ctx: EditorStateSnapshot<Editor>) {
    return {
        isBold: ctx.editor.isActive('bold') ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
    };
}

export type SubBubbleMenuStateSelector = ReturnType<typeof subBubbleMenuStateSelector>