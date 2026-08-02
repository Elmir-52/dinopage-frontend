import type { Editor, EditorStateSnapshot } from "@tiptap/react";

// ctx может быть в качесве null так как эта функция вызывается в editorStateSlice.ts для 
// инициализации state
export function subBubbleMenuStateSelector(ctx: EditorStateSnapshot<Editor> | null) {
    return {
        isBold: ctx?.editor.isActive('bold') ?? false,
        isItalic: ctx?.editor.isActive('italic') ?? false,
        isUnderline: ctx?.editor.isActive('underline') ?? false,
        isStrike: ctx?.editor.isActive('strike') ?? false,
        isCode: ctx?.editor.isActive('code') ?? false,
        isHeading1: ctx?.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx?.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx?.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx?.editor.isActive('heading', { level: 4 }) ?? false,
    };
}

export type SubBubbleMenuStateSelector = ReturnType<typeof subBubbleMenuStateSelector>