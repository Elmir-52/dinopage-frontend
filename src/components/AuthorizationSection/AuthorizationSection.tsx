import React, { useState } from "react";
import type { UserDb } from "../../App";
import './_AuthorizationSection.scss'
import { getDb } from "../../fetchRequestDB";
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from "firebase/database";
import { db } from "../../../lib/fierbase";
import { Link, useNavigate, type NavigateFunction } from "react-router";

export default function AuthorizationSection() {
    const [user, setUser] = useState<UserDb>({ user_id: '', name: '', password: '' })
    const [openEye, setOpenEye] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const usersRef: DatabaseReference = ref(db, '/users');
    const userQuery: Query = query(
        usersRef,
        orderByChild('name'),
        equalTo(user.name)
    )

    function authorizationUser(): void {
        if(user.name && user.password) {

            getDb<UserDb>(userQuery)
                .then((data: UserDb[] | undefined) => {

                    if (data && data?.length === 0) {
                        alert('Возможно вы не зарегистрировались на сайте');
                    } else if (data && data[0].password === user.password) {
                        const userFromDB: UserDb = data[0];
                        document.cookie = `user_id=${userFromDB.user_id}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                        navigate('/account');

                    } else {
                        alert('Возможно вы неправильно ввели пароль')
                    }

                })

        } else {
            alert('Введите имя и пароль');
        }
    }

    function changeUser(event: React.ChangeEvent<HTMLInputElement>, property: string): void {
        setUser((prev: UserDb) => {
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

            <button className="authorization__button" onClick={ () => authorizationUser() }>Войти в аккаунт</button>
            <Link to='/reg' className="authorization__link">Зарегестрироваться</Link>
        </section>
    )
}