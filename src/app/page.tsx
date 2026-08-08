import { Paths } from "@/shared/enums/paths.enum";
import Link from "next/link";

export default function HomePage() {
    return (
        <Link href={Paths.DOCS}>
            Go to docs
        </Link>
    )
}