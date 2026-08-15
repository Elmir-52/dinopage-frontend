export class HttpError extends Error {
    status: number;
    name: string;

    constructor(status: number, message?: string) {
        super(String(message));
        this.status = status;
        this.name = 'HttpError';
    }
}