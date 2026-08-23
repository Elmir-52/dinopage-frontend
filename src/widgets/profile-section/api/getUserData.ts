import { baseRequest, HttpError } from "@/shared/api";
import { User } from "@/shared/model";

export async function getUserDataRequest(): Promise<User> {
    try {
        let response = await baseRequest({
            url: `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            method: 'GET'
        });

        if (!response.ok) throw new Error();

        return response.json();
    } catch(error) {
        if (error instanceof HttpError) {
            if (error.status === 401) {
                throw error;
            }
        }

        throw new Error("Something went wrong, please try again later");
    }
}