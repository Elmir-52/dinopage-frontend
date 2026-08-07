import Header from '@/components/Header/Header';
import StoreProvider from '@/providers/StoreProvider';

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <StoreProvider>
            <Header />
            {children}
        </StoreProvider>
    )
}