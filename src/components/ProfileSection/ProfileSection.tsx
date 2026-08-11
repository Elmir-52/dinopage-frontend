'use client'

import { useEffect, useState } from "react";
import Modal from '@/components//Modal/Modal';
import { useRouter } from "next/navigation";
import { requestToBackend } from "@/utils/requestToBackend";
import MessageModal from "@/components/MessageModal/MessageModal";
import { User } from "@/shared/types/user";
import { HttpError } from "@/errors/httpError";
import { setToken } from "@/utils/authService";
import { Paths } from "@/shared/enums/paths.enum";
import { MessageModalState } from "@components/MessageModal/MessageModal.types";

export default function ProfileSection() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [messageModalState, setMessageModalState] = useState<MessageModalState>({
        isOpen: false,
        message: '',
    });

    useEffect(() => {
        async function getUserData() {
            try {
                let response = await requestToBackend({
                    url: `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
                    method: 'GET'
                });

                if (!response.ok) throw new Error();

                const userResponse: User = await response.json();
                setUserEmail(userResponse.email);
                setUserId(userResponse.userId);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        router.push(Paths.LOGIN);
                        return;
                    }
                }

                setMessageModalState({
                    isOpen: true,
                    message: "Something went wrong, please try again later",
                    onClick: () => router.push(Paths.DOCS)
                });
            } finally {
                setLoading(false);
            }
        }

        getUserData();
    }, []);

    async function deleteUser() {
        try {
            let response = await requestToBackend({
                url: `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
                method: 'DELETE'
            });

            if (!response.ok) throw new Error();

            setToken('');
            router.push(Paths.LOGIN);
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    setMessageModalState({
                        isOpen: true,
                        message: "Unauthorized: the profile hasn't been deleted",
                        onClick: () => router.push(Paths.LOGIN)
                    });
                    return;
                }
            }
            setMessageModalState({
                isOpen: true,
                message: "The profile hasn't been delete, please try again later"
            });
        }
    }

    function toggleIsMessageModalOpen(isOpen: boolean) {
        setMessageModalState(prev => ({ 
            ...prev,
            isOpen
        }));
    }

    if (loading) return(
        <section className="flex flex-col items-center gap-16 w-[90%] m-auto my-32">
            <p className="text-2xl">Loading...</p>
        </section>
    );

    return (
        <section className="flex flex-col items-center gap-16 w-[90%] m-auto my-32">
            <h2 className="text-5xl font-medium text-center">Hello, {userEmail.split('@')[0]}</h2>
            <p className="text-2xl text-center">Your id: {userId}</p>

            <button 
                className="text-red-600 underline text-xl cursor-pointer" 
                onClick={() => setIsModalOpen(true)}
            >
                Delete profile
            </button>

            <Modal
                message="Do you want to delete your profile?"
                isModalOpen={isModalOpen}
                setIsModalOpen={(open: boolean) => setIsModalOpen(open)}
                onClick={() => deleteUser()}
            />

            <MessageModal
                message={messageModalState.message}
                isMessageModalOpen={messageModalState.isOpen}
                setIsMessageModalOpen={toggleIsMessageModalOpen}
                onClick={messageModalState.onClick}
            />
        </section>
    );
}