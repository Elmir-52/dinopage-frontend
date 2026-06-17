export interface User {
    userId: string,
    email: string,
    createdAt: string;
}

export interface UserFormData {
    email: string;
    password: string;
}