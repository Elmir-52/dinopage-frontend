import { useEffect, useState, type ReactNode } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';

interface FloatingMenuPluginProps {
    children: ReactNode
}

export default function FloatingMenuPlugin({ children }: FloatingMenuPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        
        if ($isRangeSelection(selection) && !selection.isCollapsed()) {
          // DOM-координаты выделения
          const nativeSelection = window.getSelection() as Selection;
          const range = nativeSelection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          
          setCoords({
            x: rect.left + rect.width,
            y: rect.top + 40
          });
          setIsMenuShown(true);
        } else {
          setIsMenuShown(false);
        }
      });
    });
  }, [editor]);

  if (!isMenuShown) return null;

  return (
    <div style={{ position: 'absolute', top: coords.y, left: coords.x, zIndex: 10 }}>
       {children}
    </div>
  );
}