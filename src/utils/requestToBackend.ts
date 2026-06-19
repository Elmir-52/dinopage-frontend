import { getToken, setToken } from "./authService";
import { refreshTokens } from "./refreshTokens";

interface RequestToBackendProps<T> {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: T;
}

export async function requestToBackend<T>({
    url,
    method,
    body
}: RequestToBackendProps<T>): Promise<Response> {
    let accessToken = getToken();
    let response;

    if (!body) {
        response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        });

        if (response.status === 401) {
            setToken('');
            await refreshTokens();
                
            accessToken = getToken();
            response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(body),
            });
        }
    }

    if (body) {
        response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    
        if (response.status === 401) {
            setToken('');
            await refreshTokens();
                
            accessToken = getToken();
            response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        }
    }

    return response as Response;
}