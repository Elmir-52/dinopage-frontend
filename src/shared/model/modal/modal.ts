export type ModalOnClick = () => void;

export interface ModalState {
    isOpen: boolean;
    message: string;
    onClick: ModalOnClick;
}