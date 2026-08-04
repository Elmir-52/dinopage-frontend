import type { Metadata } from 'next'
import './globals.css';

export const metaData: Metadata = {
    title: 'Dinopage',
    description: 'App for writing notes.'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}