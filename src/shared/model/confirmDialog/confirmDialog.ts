export type ConfirmDialogOnClick = () => void;

export interface ConfirmDialogState {
    isOpen: boolean;
    message: string;
    onClick: ConfirmDialogOnClick;
}