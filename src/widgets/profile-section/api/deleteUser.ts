import { baseRequest, HttpError } from "@/shared/api";

export async function deleteUserRequest(): Promise<void> {
    try {
        let response = await baseRequest({
            url: `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
            method: 'DELETE'
        });

        if (!response.ok) throw new Error();
    } catch(error) {
        if (error instanceof HttpError) {
            if (error.status === 401) {
                throw new HttpError(error.status, "Unauthorized: the profile hasn't been deleted");
            }
        }

        throw new Error("The profile hasn't been deleted, please try again later");
    }
}