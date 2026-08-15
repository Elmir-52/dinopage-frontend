import { HttpError } from "./httpError";

export async function refreshTokens(): Promise<void> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.status === 401) {
            throw new HttpError(401);
        }
    } catch(error) {
        throw error;
    }
}