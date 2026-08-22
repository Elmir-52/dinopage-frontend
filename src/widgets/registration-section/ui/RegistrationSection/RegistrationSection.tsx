'use client'

import Form, { UserFormData } from "@/features/form";
import { PagePaths } from "@/shared/model";
import { useRouter } from "next/navigation";
import { registerRequest } from "../../api/register";

export default function RegistrationSection() {
    const router = useRouter();

    async function register(user: UserFormData) {
        await registerRequest(user);
        router.push(PagePaths.PROFILE);
    }

    return (
        <section className="flex flex-col items-center gap-8">
            <h3 className="text-5xl font-medium mb-4">Registration</h3>
            <Form buttonText="Register" submitFunction={register} />
        </section>
    )
}