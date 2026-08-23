import { UserFormData } from "@/features/form";
import { HttpError } from "@/shared/api";

export async function loginRequest(user: UserFormData) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
    
        if (response.ok) return;
    
        const data = await response.json();
    
        if (response.status === 401) {
            throw new HttpError(response.status, data.message);
        }
    } catch(error) {
        if (error instanceof HttpError) throw error;

        if (!navigator.onLine) {
            throw new Error('Turn on your Wi-Fi or mobile Internet')
        }
        
        throw new Error('Something went wrong, please try again later');
    }
}