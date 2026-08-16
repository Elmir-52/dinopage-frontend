import StoreProvider from "@/app/providers"

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