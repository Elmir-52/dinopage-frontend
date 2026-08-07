import type { Metadata } from 'next'
import './globals.css';
import { Roboto } from 'next/font/google'
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import Header from '@/components/Header/Header';
import StoreProvider from '@/providers/StoreProvider';

const roboto: NextFontWithVariable = Roboto({
    subsets: ['cyrillic', 'latin'],
    variable: '--font-roboto'
});

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
        <html 
            lang="en"
            className={`${roboto.className}`}
        >
            <body>
                <StoreProvider>
                    <Header />
                    {children}
                </StoreProvider>
            </body>
        </html>
    )
}