import { equalTo, orderByChild, query, ref, type DatabaseReference, type Query } from "firebase/database";
import Button from "../Button/Button";
import './AccountSection.css';
import { db } from "../../../lib/fierbase";
import { deleteDb, getDb, getOneElementFromDB } from "../../fetchRequestDB";
import { useEffect, useState } from "react";
import type { NoteDb, UserDb } from "../../App";
import { Link, useNavigate, type NavigateFunction } from "react-router";

export default function AccountSection() {
    const navigate: NavigateFunction = useNavigate();
    const [userName, setUserName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    // получение userId из куки
    const cookieFull: string = document.cookie;
    const cookieUserId: string = cookieFull.split('=')[1];

    const refToRequiredUser: DatabaseReference = ref(db, `users/${cookieUserId}`);

    function deleteUser() {
        const notesRef: DatabaseReference = ref(db, '/notes');
        const notesQuery: Query = query(
            notesRef,
            orderByChild('user_id'),
            equalTo(cookieUserId)
        );

        // получаем все заметки пользователя, если они существуют, то также удаляются
        getDb<NoteDb>(notesQuery)
            .then((notes: NoteDb[] | undefined) => {
                if (notes) {
                    notes.map((note: NoteDb) => {
                        const refToRequiredNote: DatabaseReference = ref(db, `notes/${note.note_id}`);
                        deleteDb(refToRequiredNote);
                    });
                }
            })

        deleteDb(refToRequiredUser)
    }

    useEffect(() => {
        getOneElementFromDB<UserDb>(refToRequiredUser)
            .then((data: UserDb | undefined) => {
            if (data) {
                setUserName(data.name);
                setLoading(false);
            }
        })
    }, []);

    // если данные загружаются то надпись loading...
    if (loading) return(
        <section className="account-section">
            <p>Loading...</p>
        </section>
    )

    return (
        <section className="account-section">
            <h2 className="account-section__h2">Добрый день {userName}</h2>
            <p className="account-section__paragraph">Ваш id: {cookieUserId}</p>

            <div className="account-section__wrapper-buttons">
                <Link to='/' className="button">На главную</Link>

                <Button className="account-section__delete-button" onClick={() => { 
                    deleteUser();
                    navigate('/');
                    document.cookie = `user_id=; path=/; max-age=-1`;
                }}>Удалить аккаунт</Button>
            </div>
        </section>
    )
}