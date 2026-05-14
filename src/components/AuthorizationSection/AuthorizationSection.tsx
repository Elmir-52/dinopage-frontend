import React, { useState } from "react";
import './_AuthorizationSection.scss'
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import { Link, useNavigate, type NavigateFunction } from "react-router";
import type { User } from "../../shared/types/user";

export default function AuthorizationSection() {
    const [user, setUser] = useState<User>({ user_id: '', name: '', password: '' })
    const [openEye, setOpenEye] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();
    
    async function authorization() {
        try {
            if (user.name && user.password) {
                const res = await fetch('http://localhost:3000/api/user/auth', {
                    method: 'POST',
                    body: JSON.stringify({ name: user.name, password: user.password })
                });

                if (res.ok) {
                    const data = await res.json();
                    document.cookie = `user_id=${data}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
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
                    name: event.target.value
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
            <input className="authorization__input" type="text" placeholder='Введите имя' value={user.name} onChange={(event) => changeUser(event, 'name')}/>
            <div className="authorization__password-wrapper">
                {
                    openEye ? <input className="authorization__password-input" type="text" placeholder='Введите пароль' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                        : <input className="authorization__password-input" type="password" placeholder='Введите пароль' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                }
                <button onClick={() => setOpenEye(prev => !prev)} className="registration__button-eye">
                    <img className="authorization__image-eye" src={!openEye ? closeEyeImage : openEyeImage} alt="иконка глаза" />
                </button>
            </div>

            <button className="authorization__button" onClick={ () => authorization() }>Войти в аккаунт</button>
            <Link to='/reg' className="authorization__link">Зарегестрироваться</Link>
        </section>
    )
}