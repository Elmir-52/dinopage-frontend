import React, { useState } from "react";
import './_RegistrationSection.scss'
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import { useNavigate, type NavigateFunction } from "react-router";
import Button from "../Button/Button";
import type { User } from "../../shared/types/user";

export default function RegistrationSection() {
    const arrayOfNumbersForNewUserId: BigUint64Array<ArrayBuffer> = crypto.getRandomValues(new BigUint64Array(2));
    const newUserId: string = `${arrayOfNumbersForNewUserId[0].toString(36).padStart(13, '0')}-${arrayOfNumbersForNewUserId[1].toString(36).padStart(13, '0')}`;
    const [user, setUser] = useState<User>({ user_id: newUserId, name: '', password: ''})
    const [openEye, setOpenEye] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    async function registration() {
        try {
            if (user.name && user.password) {
                const res = await fetch('http://localhost:3000/api/user/reg', {
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
        <section className="registration">
            <h3 className="registration__h3">Регистрация</h3>
            <input className="registration__input" type="text" placeholder='Введите имя' value={user.name} onChange={(event) => changeUser(event, 'name')}/>
            <div className="registration__password-wrapper">
                {
                    openEye ? <input className="registration__password-input" type="text" placeholder='Введите пароль' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                        : <input className="registration__password-input" type="password" placeholder='Введите пароль' value={user.password} onChange={(event) => changeUser(event, 'password')}/>
                }
                <button onClick={() => setOpenEye(prev => !prev)} className="registration__button-eye">
                    <img className="registration__image-eye" src={!openEye ? closeEyeImage : openEyeImage} alt="иконка глаза" />
                </button>
            </div>

            <Button className="registration__button" onClick={() => registration() }>Зарегистрироваться</Button>
        </section>
    )
}