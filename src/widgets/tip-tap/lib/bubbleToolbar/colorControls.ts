import { Editor } from "@tiptap/react";

interface Color {
    colorName: string;
    hexColor: string;
}

export interface ColorControl { 
    title: string;
    hexColor: string;
    onClick: () => void;
}

const COLORS: Color[] = [
    {
        colorName: 'Red',
        hexColor: '#ff0000',
    },
    {
        colorName: 'Blue',
        hexColor: '#0000ff',
    },
    {
        colorName: 'Green',
        hexColor: '#00aa00',
    },
    {
        colorName: 'Yellow',
        hexColor: "#FFCC00",
    },
    {
        colorName: 'Brown',
        hexColor: '#964B00',
    },
    {
        colorName: 'Gray',
        hexColor: '#8E8E93',
    },
    {
        colorName: 'Orange',
        hexColor: '#FF8D28',
    },
    {
        colorName: 'Purple',
        hexColor: '#CB30E0',
    },
    {
        colorName: 'Pink',
        hexColor: '#FFC0CB',
    }
]

export function createColorControls(editor: Editor): ColorControl[] {
    return [
        {
            title: "Default color",
            hexColor: '#000000',
            onClick: () => editor?.chain().focus().unsetColor().run()
        },
        ...COLORS.map(color => {
            return {
                title: color.colorName,
                hexColor: color.hexColor,
                onClick: () => editor?.chain().focus().setColor(color.hexColor).run()
            }
        })
    ]
};