export type ErrorDialogOnClick = () => void;

export interface ErrorDialogState {
    isOpen: boolean;
    message: string;
    onClick?: ErrorDialogOnClick;
}