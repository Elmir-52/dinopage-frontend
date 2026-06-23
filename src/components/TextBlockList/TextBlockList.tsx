import { $setBlocksType } from "@lexical/selection";
import { $createParagraphNode, $getSelection, type LexicalEditor } from "lexical";
import {
  $createHeadingNode,
  $createQuoteNode,
} from '@lexical/rich-text';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import './TextBlockList.scss';

interface TextBlockListProps {
  blockType: string;
}

const BLOCK_TYPES = [
    {label: 'Normal', value: 'paragraph'},
    {label: 'Heading 1', value: 'h1'},
    {label: 'Heading 2', value: 'h2'},
    {label: 'Heading 3', value: 'h3'},
];

function blockParagraph(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection();
    $setBlocksType(selection, () => $createParagraphNode());
  });
}

function blockHeading(editor: LexicalEditor, headingTag: 'h1' | 'h2' | 'h3') {
  editor.update(() => {
    const selection = $getSelection();
    $setBlocksType(selection, () => $createHeadingNode(headingTag));
  });
}

function applyBlockType(editor: LexicalEditor, type: string) {
  if (type === 'paragraph') {
    blockParagraph(editor);
  } else {
    blockHeading(editor, type as 'h1' | 'h2' | 'h3');
  }
}

export default function TextBlockList({ blockType }: TextBlockListProps) {
    const [editor] = useLexicalComposerContext();

    return (
        <select
          className="block-list"
          onChange={e => applyBlockType(editor, e.target.value)}
          value={blockType}
        >
          {
            BLOCK_TYPES.map(({ label, value }) => {
                return <option 
                  key={label} 
                  value={value}
                >{label}</option>
              })
          }
        </select>
    );
}