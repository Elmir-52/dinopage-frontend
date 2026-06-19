import './ProfileSection.scss';
import { useEffect, useState } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import type { User } from "../../shared/types/user";
import { setToken } from "../../utils/authService";
import { HttpError } from "../../errors/httpError";
import Modal from '../Modal/Modal';
import { requestToBackend } from '../../utils/requestToBackend';
import MessageModal, { type MessageModalOnClick } from '../MessageModal/MessageModal';

export default function ProfileSection() {
    const navigate: NavigateFunction = useNavigate();
    const [userEmail, setUserEmail] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
    const [messageModalMessage, setMessageModalMessage] = useState<string>('');
    const [messageModalOnClick, setMessageModalOnClick] = useState<MessageModalOnClick>(() => () => {});

    useEffect(() => {
        async function getUserData() {
            try {
                let response = await requestToBackend({
                    url: 'http://localhost:3000/users/me',
                    method: 'GET'
                });

                if (!response.ok) throw new Error();

                const userResponse: User = await response.json();
                setUserEmail(userResponse.email);
                setUserId(userResponse.userId);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        navigate('/login');
                        return;
                    }
                }

                setMessageModalMessage("Something went wrong, please try again later");
                setMessageModalOnClick(() => () => navigate('/'));
                setIsMessageModalOpen(true);
            } finally {
                setLoading(false);
            }
        }

        getUserData();
    }, []);

    async function deleteUser() {
        try {
            let response = await requestToBackend({
                url: 'http://localhost:3000/users/me',
                method: 'DELETE'
            });

            if (!response.ok) throw new Error();

            setToken('');
            navigate('/login');
        } catch(error) {
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    setMessageModalMessage("Unauthorized: the profile hasn't been deleted");
                    setMessageModalOnClick(() => () => navigate('/login'));
                    setIsMessageModalOpen(true);
                    return;
                }
            }
            setMessageModalMessage("The profile hasn't been delete, please try again later");
            setMessageModalOnClick(() => () => {});
            setIsMessageModalOpen(true);
        }
    }

    if (loading) return(
        <section className="profile">
            <p className="profile__loading">Loading...</p>
        </section>
    );

    return (
        <section className="profile">
            <h2 className="profile__h2">Hello, {userEmail.split('@')[0]}</h2>
            <p className="profile__paragraph">Your id: {userId}</p>

            <div className="profile__wrapper-buttons">
                <button 
                    className="profile__delete-button" 
                    onClick={() => setIsModalOpen(true)}
                >
                    Delete profile
                </button>
            </div>

            <Modal
                message="Do you want to delete your profile?"
                isModalOpen={isModalOpen}
                setIsModalOpen={(open: boolean) => setIsModalOpen(open)}
                onClick={() => deleteUser()}
            />

            <MessageModal
                message={messageModalMessage}
                isMessageModalOpen={isMessageModalOpen}
                setIsMessageModalOpen={(open: boolean) => setIsMessageModalOpen(open)}
                onClick={() => messageModalOnClick()}
            />
        </section>
    );
}