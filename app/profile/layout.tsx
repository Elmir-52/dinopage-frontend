import Header from '@/components/Header/Header';

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}