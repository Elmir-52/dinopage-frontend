import type { Metadata } from 'next'
import './globals.css';
import { Roboto } from 'next/font/google'
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';

const roboto: NextFontWithVariable = Roboto({
    subsets: ['cyrillic', 'latin'],
    variable: '--font-roboto'
});

export const metadata: Metadata = {
    title: 'Dinopage',
    description: 'App for writing notes.'
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html 
            lang="en"
            className={`${roboto.className}`}
        >
            <body>
                {children}
            </body>
        </html>
    )
}