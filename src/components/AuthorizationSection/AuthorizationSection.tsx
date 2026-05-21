import React, { useState } from "react";
import './_AuthorizationSection.scss'
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import { Link, useNavigate, type NavigateFunction } from "react-router";
import type { User } from "../../shared/types/user";

export default function AuthorizationSection() {
    const [user, setUser] = useState<User>({ user_id: '', email: '', password: '' })
    const [openEye, setOpenEye] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();
    
    async function authorization() {
        try {
            if (user.email && user.password) {
                const res = await fetch('http://localhost:3000/api/user/auth', {
                    method: 'POST',
                    body: JSON.stringify({ email: user.email, password: user.password })
                });

                if (res.ok) {
                    const user: User = await res.json();
                    document.cookie = `user_id=${user.user_id}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                    navigate('/account');
                } else {
                    const data = await res.json();
                    throw new Error(`${data}`);
                }
            }
        } catch(error) {
            const err = error as Error;
            console.error(err.message);
        }
    }

    function changeUser(event: React.ChangeEvent<HTMLInputElement>, property: string): void {
        setUser((prev: User) => {
            if (property === 'name') {
                return {
                    ...prev,
                    email: event.target.value
                }
            } else if (property === 'password') {
                return {
                    ...prev,
                    password: event.target.value
                }
            } else {
                return prev;
            }
        });
    }

    return (
        <section className="authorization">
            <h3 className="authorization__h3">Авторизация</h3>
            <input className="authorization__input" type="email" placeholder='email' value={user.email} onChange={(event) => changeUser(event, 'name')}/>
            <div className="authorization__password-wrapper">
                {
                    openEye ? <input className="authorization__password-input" type="text" placeholder='password' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                        : <input className="authorization__password-input" type="password" placeholder='password' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                }
                <button onClick={() => setOpenEye(prev => !prev)} className="registration__button-eye">
                    <img className="authorization__image-eye" src={!openEye ? closeEyeImage : openEyeImage} alt="иконка глаза" />
                </button>
            </div>

            <button className="authorization__button" onClick={ () => authorization() }>Войти в аккаунт</button>
            <Link to='/reg' className="authorization__link">Зарегистрироваться</Link>
        </section>
    )
}