export function closeFloatingMenu() {
    const floatingMenuElement = document.getElementById('floating-menu');

    if (floatingMenuElement?.style) {
        floatingMenuElement.style.display = 'none';
    }
}