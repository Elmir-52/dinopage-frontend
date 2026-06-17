let accessToken: string | null = null;

export function setToken(token: string): void {
    accessToken = token;
}

export function getToken(): string | null {
    return accessToken;
}