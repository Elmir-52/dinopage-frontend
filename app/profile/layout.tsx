import Header from "@/widgets/Header"

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