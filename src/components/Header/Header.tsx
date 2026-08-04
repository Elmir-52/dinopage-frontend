'use client'

import { usePathname } from 'next/navigation';
import { HEADER_NAV_LINKS } from '../../shared/data/headerNavLinks';
import Link from 'next/link';

export default function Header() {
    const currentPath = usePathname();

    return (
        <header 
            className="font-semibold flex justify-center items-center h-25 
            sticky top-0 z-10 mb-12.5"
        >
            <nav 
                className="flex items-center gap-2.5 p-2.5 bg-white/10 backdrop-blur-md 
                shadow-2xl rounded-4xl"
            >
                {
                    HEADER_NAV_LINKS.map(link => {
                        return <Link
                            key={link.path} 
                            href={link.path} 
                            className={currentPath === link.path ? 
                                'text-xl px-5 py-2.5 rounded-3xl cursor-pointer bg-black text-white' : 
                                'text-xl px-5 py-2.5 rounded-3xl cursor-pointer hover:bg-black hover:text-white'
                            }
                        >
                            {link.name}
                        </Link>
                    })
                }
            </nav>
        </header>
    );
}