import { useConfirmDialogModel, useErrorDialogModel } from "@/shared/model";
import { useProfileModel } from "./useProfile.m";

export function useProfileViewModel() {
    const {
        user,
        loading,
        getUserData,
        getUserDataError,
        deleteUser,
        deleteUserError,
        routeToLogin
    } = useProfileModel();

    const deleteUserConfirmDialogModel = useConfirmDialogModel("Do you want to delete your profile?", deleteUser);
    const getUserDataErrorDialogModel = useErrorDialogModel(getUserDataError, getUserData);
    const deleteUserErrorDialogModel = useErrorDialogModel(deleteUserError, routeToLogin);

    return {
        user,
        loading,
        deleteUserConfirmDialogModel,
        getUserDataErrorDialogModel,
        deleteUserErrorDialogModel
    }
}