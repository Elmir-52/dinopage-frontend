import React, { useState } from "react";
import './_RegistrationSection.scss'
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import { useNavigate, type NavigateFunction } from "react-router";
import Button from "../Button/Button";
import type { User, UserDataForRequestToBackend } from "../../shared/types/user";

export default function RegistrationSection() {
    const [user, setUser] = useState<UserDataForRequestToBackend>({ email: '', password: ''})
    const [openEye, setOpenEye] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    async function registration() {
        try {
            if (user.email && user.password) {
                const res = await fetch('http://localhost:3000/api/user/reg', {
                    method: 'POST',
                    body: JSON.stringify(user),
                });

                if (res.ok) {
                    const user: User = await res.json() as User;
                    document.cookie = `user_id=${user.user_id}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                    navigate('/account');
                } else {
                    const errorMessage = await res.json();
                    throw new Error(`${errorMessage}`);
                }
            }
        } catch(error) {
            const err = error as Error;
            console.error(err.message);
        }
    }

    function changeUser(event: React.ChangeEvent<HTMLInputElement>, property: 'email' | 'password'): void {
        if (property === 'email') {
            setUser((prev: UserDataForRequestToBackend) => {
                    return {
                        ...prev,
                        email: event.target.value
                    }
                }
            ); 
        } else {
            setUser((prev: UserDataForRequestToBackend) => {
                    return {
                        ...prev,
                        password: event.target.value
                    }
                }
            ); 
        }
    }

    return (
        <section className="registration">
            <h3 className="registration__h3">Регистрация</h3>
            <input className="registration__input" type="email" placeholder='email' value={user.email} onChange={(event) => changeUser(event, 'email')}/>
            <div className="registration__password-wrapper">
                {
                    openEye ? <input className="registration__password-input" type="text" placeholder='password' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                        : <input className="registration__password-input" type="password" placeholder='password' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                }
                <button onClick={() => setOpenEye(prev => !prev)} className="registration__button-eye">
                    <img className="registration__image-eye" src={!openEye ? closeEyeImage : openEyeImage} alt="иконка глаза" />
                </button>
            </div>

            <Button className="registration__button" onClick={() => registration() }>Зарегистрироваться</Button>
        </section>
    )
}