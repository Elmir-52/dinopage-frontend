import { refreshTokens } from "./refreshTokens";

interface RequestToBackendProps<T> {
    url: string;
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: T;
}

// функция обёртка, которая автоматически прикрепляет httpOnly куки (access token) к запросу, 
// и в случае 401 статуса, делает запрос на обновление токенов и повторный запрос к бэкенду
export async function baseRequest<T>({
    url,
    method,
    body
}: RequestToBackendProps<T>): Promise<Response> {
    let response;

    if (!body) {
        response = await fetch(url, {
            method: method,
            credentials: 'include', 
        });

        if (response.status === 401) {
            await refreshTokens();
                
            response = await fetch(url, {
                method: method,
                credentials: 'include',
            });
        }
    }

    if (body) {
        response = await fetch(url, {
            method: method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    
        if (response.status === 401) {
            await refreshTokens();
                
            response = await fetch(url, {
                method: method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        }
    }

    return response as Response;
}