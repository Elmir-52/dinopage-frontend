export function openFloatingMenu(event: React.MouseEvent) {
    const customParagraphElement = event.currentTarget;
    const editorContentElement = customParagraphElement.closest('#editor-content') as Element;
    const floatingMenuElement = document.getElementById('floating-menu');


    const customParagraphElementTop = customParagraphElement
        .getBoundingClientRect()
        .top;

    const customParagraphElementLeft = customParagraphElement
        .getBoundingClientRect()
        .left;
    const editorContentElementLeft = editorContentElement
        .getBoundingClientRect()
        .left;

    const floatingMenuTop = customParagraphElementTop;
    const floatingMenuLeft = editorContentElementLeft + ((customParagraphElementLeft - editorContentElementLeft) / 3);

    
    if (floatingMenuElement?.style) {
        floatingMenuElement.style.top = `${floatingMenuTop}px`;
        floatingMenuElement.style.left = `${floatingMenuLeft}px`;
        floatingMenuElement.style.display = 'block';
    }
}