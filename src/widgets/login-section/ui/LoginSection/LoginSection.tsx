'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";
import { PagePaths } from "@/shared/model";
import Form, { UserFormData } from "@/features/form";
import { loginRequest } from "../../api/login";

export default function LoginSection() {
    const router = useRouter();
    
    async function login(user: UserFormData) {
        await loginRequest(user);
        router.push(PagePaths.PROFILE);
    }

    return (
        <section className="flex flex-col items-center gap-8">
            <h3 className="text-5xl font-medium mb-4">Login</h3>
            <Form submitButtonContent='Log in' submitFunction={login} />
            
            <Link
                href={PagePaths.REGISTER}
                className="text-2xl text-blue-600 underline"
            >
                Register
            </Link>
        </section>
    )
}