export type MessageModalOnClick = () => void;

export interface MessageModalState {
    isOpen: boolean;
    message: string;
    onClick?: MessageModalOnClick;
}