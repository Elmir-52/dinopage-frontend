import './_MessageSection.scss'

interface MessageSectionProps {
    children: string;
}

export default function MessageSection({ children }: MessageSectionProps) {
    return(
        <div className="message">
            <p className="message__text">{children}</p>
        </div>
    )
}