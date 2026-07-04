import Paragraph from "@tiptap/extension-paragraph";
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer, type NodeViewProps } from "@tiptap/react";
import { openFloatingMenu } from "../../utils/openFloatingMenu";

function ParagraphComponent(props: NodeViewProps) {
    return (
        <NodeViewWrapper onMouseEnter={openFloatingMenu}>
            <NodeViewContent />
        </NodeViewWrapper>
    );
}

export const CustomParagraphExtension = Paragraph.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ParagraphComponent);
  },
});