import { PagePaths, User } from "@/shared/model";
import { useEffect, useState } from "react";
import { getUserDataRequest } from "../api/getUserData";
import { HttpError } from "@/shared/api";
import { deleteUserRequest } from "../api/deleteUser";
import { useRouter } from "next/navigation";

export function useProfileModel() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>();
    const [getUserDataError, setGetUserDataError] = useState<Error>();
    const [deleteUserError, setDeleteUserError] = useState<Error>();

    useEffect(() => {
        getUserData();
    }, []);

    async function getUserData() {
        try {
            const data = await getUserDataRequest();
            setUser(data);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    router.push(PagePaths.LOGIN);
                    return;
                }
            }

            if (error instanceof Error) setGetUserDataError(error);
        } finally {
            setLoading(false);
        }
    }

    async function deleteUser() {
        try {
            await deleteUserRequest();
            router.push(PagePaths.LOGIN);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    setDeleteUserError(error);
                    return;
                }
            }

            if (error instanceof Error) setDeleteUserError(error);
        }
    }

    const routeToLogin = () => router.push(PagePaths.LOGIN);

    return {
        user,
        loading,
        getUserData,
        getUserDataError,
        deleteUser,
        deleteUserError,
        routeToLogin
    }
}