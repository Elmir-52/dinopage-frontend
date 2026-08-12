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
            <main>
                <h1
                    className="text-5xl font-semibold text-center mx-auto w-max-250 px-6
                    mb-20"
                >
                    Write your <b>great thoughts</b> and <b><i>best ideas</i></b> 💡
                </h1>
                <section
                    className="mx-auto w-[90%] bg-yellow-200 p-5 pb-10 rounded-2xl mb-15"
                >
                    <h2
                        className="text-4xl font-semibold mb-20"
                    >
                        Create notes
                    </h2>

                    <div 
                        className="w-full rounded-xl overflow-hidden mx-auto
                        bg-white shadow-xl border border-solid border-gray-200
                        sm:w-[70%]"
                    >
                        <div className="w-full h-7 md:h-10 flex items-center gap-2.5 px-4">
                            <div className="rounded-full w-4 h-4 bg-red-500"></div>
                            <div className="rounded-full w-4 h-4 bg-yellow-400"></div>
                            <div className="rounded-full w-4 h-4 bg-green-500"></div>
                        </div>
                        <img
                            className="w-full"
                            src="/creating-note-screenshot.png"
                            alt="Creating note screenshot"
                        />
                    </div>
                </section>
                <section
                    className="mx-auto w-[90%] bg-red-200 p-5 pb-10 rounded-2xl mb-15"
                >
                    <h2
                        className="text-4xl font-semibold mb-20"
                    >
                        Edit the text
                    </h2>

                    <div 
                        className="w-full rounded-xl overflow-hidden mx-auto
                        bg-white shadow-xl border border-solid border-gray-200
                        sm:w-[70%]"
                    >
                        <div className="w-full h-7 md:h-10 flex items-center gap-2.5 px-4">
                            <div className="rounded-full w-4 h-4 bg-red-500"></div>
                            <div className="rounded-full w-4 h-4 bg-yellow-400"></div>
                            <div className="rounded-full w-4 h-4 bg-green-500"></div>
                        </div>
                        <img
                            className="w-full"
                            src="/edition-text-screenshot.png"
                            alt="Edition text screenshot"
                        />
                    </div>
                </section>
            </main>
        </>
    )
}