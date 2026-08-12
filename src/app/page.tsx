import { Paths } from "@/shared/enums/paths.enum";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Dinopage — Free Online Notes App | Write, Organize, Search',
    description: 'Dinopage is a clean and fast note-taking app. Create, organize and search your notes in seconds. Free forever. No clutter — just pure productivity.',
    keywords: ['note taking app', 'online notes', 'free notes app', 'note organizer', 'dinopage', 'notes web app', 'simple notes', 'digital notebook']
}

export default function HomePage() {
    return (
        <Link href={Paths.DOCS}>
            Go to docs
        </Link>
    )
}