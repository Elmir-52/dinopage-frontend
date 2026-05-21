export interface UserDataForRequestToBackend {
    email: string;
    password: string;
}

export interface User {
    user_id: string,
    email: string,
    password: string,
}