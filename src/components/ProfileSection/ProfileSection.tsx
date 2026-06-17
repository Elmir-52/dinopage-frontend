import Button from "../Button/Button";
import './ProfileSection.scss';
import { useEffect, useState } from "react";
import { useNavigate, type NavigateFunction } from "react-router";
import type { User } from "../../shared/types/user";
import { getToken } from "../../utils/authService";
import { refreshTokens } from "../../utils/refreshTokens";
import { HttpError } from "../../errors/httpError";

export default function ProfileSection() {
    const navigate: NavigateFunction = useNavigate();
    const [userEmail, setUserEmail] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    let accessToken = getToken();

    useEffect(() => {
        async function getUserData() {
            try {
                let response = await fetch('http://localhost:3000/users/me', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    }
                });

                if (response.status === 401) {
                    await refreshTokens();
                        
                    accessToken = getToken();
                    response = await fetch('http://localhost:3000/users/me', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                        },
                    });
                }

                const userResponse: User = await response.json();
                setUserEmail(userResponse.email);
                setUserId(userResponse.userId);
                setLoading(false);
            } catch(error) {
                if (error instanceof HttpError) {
                    if (error.status === 401) {
                        navigate('/login');
                    }
                }
            }
        }

        getUserData();
    }, []);

    async function deleteUser() {
        try {
            let response = await fetch('http://localhost:3000/users/me', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 401) {
                await refreshTokens();
                    
                accessToken = getToken();
                await fetch('http://localhost:3000/users/me', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
            }

            navigate('/login');
        } catch(error) {
            console.error(error);
        }
    }

    if (loading) return(
        <section className="account">
            <p className="account__loading">Loading...</p>
        </section>
    );

    return (
        <section className="account">
            <h2 className="account__h2">Hello, {userEmail.split('@')[0]}</h2>
            <p className="account__paragraph">Your id: {userId}</p>

            <div className="account__wrapper-buttons">
                <Button 
                    className="account__delete-button" 
                    onClick={() => deleteUser()}
                >Delete profile</Button>
            </div>
        </section>
    );
}