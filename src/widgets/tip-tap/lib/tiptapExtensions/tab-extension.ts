import { Extension } from '@tiptap/core'

export const TabExtension = Extension.create({
  name: 'tabKey',
  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        // '\t' - табуляция
        return editor.commands.insertContent('\t');
      },
    }
  },
})
