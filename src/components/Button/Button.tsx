import { type ReactNode } from "react";
import './_Button.scss'

type PropsButton = {
    className?: string;
    children: ReactNode;
    onClick: () => void;
}

export default function Button({ className = 'button', children, onClick }: PropsButton) {

    return <button className={className} onClick={onClick}>{children}</button>
}