'use client'

import { ConfirmDialog, ErrorDialog, Modal } from "@/shared/ui";
import { useProfileViewModel } from "../../model/useProfile.vm";

export default function ProfileSection() {
    const {
        user,
        loading,
        deleteUserConfirmDialogModel,
        getUserDataErrorDialogModel,
        deleteUserErrorDialogModel
    } = useProfileViewModel();

    if (loading) return(
        <section className="flex flex-col items-center gap-16 w-[90%] m-auto my-32">
            <p className="text-2xl">Loading...</p>
        </section>
    );

    return (
        <section className="flex flex-col items-center gap-16 w-[90%] m-auto my-32">
            <h2 className="text-5xl font-medium text-center">Hello, {user?.email.split('@')[0]}</h2>
            <p className="text-2xl text-center">Your id: {user?.userId}</p>

            <button 
                className="text-red-600 underline text-xl cursor-pointer" 
                onClick={() => deleteUserConfirmDialogModel.toggleIsOpen(true)}
            >
                Delete profile
            </button>

            <Modal isOpen={deleteUserConfirmDialogModel.confirmDialogState.isOpen}>
                <ConfirmDialog
                    {...deleteUserConfirmDialogModel.confirmDialogState}
                    setIsOpen={deleteUserConfirmDialogModel.toggleIsOpen}
                />
            </Modal>

            <Modal isOpen={getUserDataErrorDialogModel.errorDialogState.isOpen}>
                <ErrorDialog
                    {...getUserDataErrorDialogModel.errorDialogState}
                    setIsOpen={getUserDataErrorDialogModel.toggleIsOpen}
                />
            </Modal>

            <Modal isOpen={deleteUserErrorDialogModel.errorDialogState.isOpen}>
                <ErrorDialog
                    {...deleteUserErrorDialogModel.errorDialogState}
                    setIsOpen={deleteUserErrorDialogModel.toggleIsOpen}
                />
            </Modal>
        </section>
    );
}