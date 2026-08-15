import StoreProvider from '@/providers/StoreProvider';

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <StoreProvider>
            {children}
        </StoreProvider>
    )
}