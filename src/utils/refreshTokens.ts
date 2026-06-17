import { HttpError } from "../errors/httpError";
import type { AuthResponse } from "../shared/types/authResponse";
import { setToken } from "./authService";

export async function refreshTokens(): Promise<void> {
    try {
        const response = await fetch(`http://localhost:3000/auth/refresh`, {
            method: 'POST',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 401) {
            throw new HttpError(401);
        }
    
        const { accessToken }: AuthResponse = await response.json();
        setToken(accessToken);
    } catch(error) {
        throw error;
    }
}