import { Paths } from "@/shared/enums/paths.enum";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Dinopage — Free Online Notes App | Write, Organize, Search',
    description: 'Dinopage is a clean and fast note-taking app. Create, organize and search your notes in seconds. Free forever. No clutter — just pure productivity.',
    keywords: ['note taking app', 'online notes', 'free notes app', 'note organizer', 'dinopage', 'notes web app', 'simple notes', 'digital notebook']
}

export default function HomePage() {
    return (
        <>
            <header
                className="w-[95%] h-25 sticky top-0 z-10 mx-auto mt-2.5 mb-16"
            >
                <nav 
                    className="flex justify-between items-center p-2.5 bg-white/10 
                    backdrop-blur-md shadow-2xl rounded-2xl"
                    >
                    <Link 
                        className="p-2 rounded-xl cursor-pointer bg-gray-200
                        border border-solid border-gray-400"
                        href={Paths.MAIN}
                    >
                        <Image 
                            src="/dino.png"
                            width={26}
                            height={26}
                            alt="Dinopage logo"
                        />
                    </Link>
                    
                    <Link 
                        className="px-5 py-2 rounded-xl cursor-pointer bg-black 
                        text-white h-full"
                        href={Paths.DOCS}
                    >
                        Open Dinopage
                    </Link>
                </nav>
            </header>
        </>
    )
}