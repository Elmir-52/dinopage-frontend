'use client'

import Form from "@/components/Form/Form";
import { HttpError } from "@/errors/httpError";
import { Paths } from "@/shared/enums/paths.enum";
import { AuthResponse } from "@/shared/types/authResponse";
import { UserFormData } from "@/shared/types/user";
import { setToken } from "@/utils/authService";
import { useRouter } from "next/navigation";

export default function RegistrationSection() {
    const router = useRouter();

    async function registration(user: UserFormData) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            const data = await response.json();
    
            if (response.status === 409) {
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
            <h3 className="text-5xl font-medium mb-4">Registration</h3>
            <Form buttonText="Register" submitFunction={(user: UserFormData) => registration(user)} />
        </section>
    )
}