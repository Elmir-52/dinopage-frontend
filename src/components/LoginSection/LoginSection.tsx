'use client'

import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserFormData } from "@/shared/types/user";
import { HttpError } from "@/errors/httpError";
import { AuthResponse } from "@/shared/types/authResponse";
import { setToken } from "@/utils/authService";
import Form from "@/components/Form/Form";
import { Paths } from "@/shared/enums/paths.enum";

export default function LoginSection() {
    const router = useRouter();
    
    async function login(user: UserFormData) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            const data = await response.json();
    
            if (response.status === 401) {
                throw new HttpError(response.status, data.message);
            }
    
            if (!response.ok) {
                throw new Error();
            }
    
            const { accessToken }: AuthResponse = data;
            setToken(accessToken);
            router.push(Paths.PROFILE);
        } catch(error) {
            if (error instanceof HttpError) throw error;

            if (!navigator.onLine) {
                throw new Error('Turn on your Wi-Fi or mobile Internet')
            }
            
            throw new Error('Something went wrong, please try again later');
        }
    }

    return (
        <section className="flex flex-col items-center gap-8">
            <h3 className="text-5xl font-medium mb-4">Login</h3>
            <Form buttonText='Log in' submitFunction={(user: UserFormData) => login(user)} />
            
            <Link
                href={Paths.REGISTER}
                className="text-2xl text-blue-600 underline"
            >
                Register
            </Link>
        </section>
    )
}