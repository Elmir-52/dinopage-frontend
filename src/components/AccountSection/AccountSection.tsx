import Button from "../Button/Button";
import './_AccountSection.scss';
import { useEffect, useState } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import type { User } from "../../shared/types/user";
import getCookie from "../../utils/getCookie";

export default function AccountSection() {
    const navigate: NavigateFunction = useNavigate();
    const [userEmail, setUserEmail] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const cookieUserId: string | undefined = getCookie('user_id');

    async function deleteUser() {
        try {
            const res = await fetch('http://localhost:3000/api/user/delete', {
                method: 'DELETE',
                headers: {
                    "Authorization": `${cookieUserId}`,
                }
            });

            if (res.ok) {
                document.cookie = `user_id=; path=/; max-age=-1`;
                navigate('/');
            } else {
                const message = await res.json();
                throw new Error(`${message}`);
            }
        } catch(error) {
            const err = error as Error;
            console.log(err.message);
        }
    }

    useEffect(() => {
        async function getUserData() {
            try {
                const res = await fetch('http://localhost:3000/api/user/get', {
                    headers: {
                        "Authorization": `${cookieUserId}`,
                    }
                });

                if (res.ok) {
                    const user: User = await res.json();
                    setUserEmail(user.email);
                    setUserId(user.user_id);
                    setLoading(false);
                } else {
                    const message = await res.json();
                    throw new Error(`${message}`);
                }
            } catch(error) {
                const err = error as Error;
                console.error(err.message);
            }
        }

        getUserData();
    }, []);

    if (loading) return(
        <section className="account">
            <p className="account__loading">Loading...</p>
        </section>
    );

    return (
        <section className="account">
            <h2 className="account__h2">Добрый день {userEmail}</h2>
            <p className="account__paragraph">Ваш id: {userId}</p>

            <div className="account__wrapper-buttons">
                <Button 
                    className="account__delete-button" 
                    onClick={() => deleteUser()}
                >Удалить аккаунт</Button>
            </div>
        </section>
    );
}