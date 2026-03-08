import React, { useState } from "react";
import type { UserDb } from "../../App";
import './_RegistrationSection.scss'
import { getDb, setDb } from "../../fetchRequestDB";
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from "firebase/database";
import { db } from "../../../lib/fierbase";
import { useNavigate, type NavigateFunction } from "react-router";
import Button from "../Button/Button";

export default function RegistrationSection() {
    const arrayOfNumbersForNewUserId: BigUint64Array<ArrayBuffer> = crypto.getRandomValues(new BigUint64Array(2));
    const newUserId: string = `${arrayOfNumbersForNewUserId[0].toString(36).padStart(13, '0')}-${arrayOfNumbersForNewUserId[1].toString(36).padStart(13, '0')}`;
    console.log(newUserId);
    const [user, setUser] = useState<UserDb>({ user_id: newUserId, name: '', password: ''})
    const [openEye, setOpenEye] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const usersRef: DatabaseReference = ref(db, '/users');
    const refToRequiredUser = ref(db, `/users/${user.user_id}`);
    const userQuery: Query = query(
        usersRef,
        orderByChild('name'),
        equalTo(user.name)
    )

    function registrationUser(): void {
        if(user.name && user.password) {
            
            getDb<UserDb>(userQuery)
                .then((data: UserDb[] | undefined) => {
                    
                    if (data?.length === 0) {
                        setDb<UserDb>(refToRequiredUser, user)
                            .then(() => { 
                                document.cookie = `user_id=${user.user_id}; path=/; max-age=${(60 * 60 * 24 * 30) * 2}`;
                                navigate('/account');
                            })
                    } else {
                        alert('Пользователь с таким именем уже есть');
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

            <Button className="registration__button" onClick={() => registrationUser() }>Зарегестрироваться</Button>
        </section>
    )
}