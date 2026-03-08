import React, { useEffect, useState } from 'react';
import { deleteDb, getOneElementFromDB, setDb } from '../../fetchRequestDB';
import type { NoteDb } from '../../App';
import './_NoteTextSection.scss';
import { db } from '../../../lib/fierbase';
import { ref, type DatabaseReference } from 'firebase/database';
import { Link, useNavigate, type NavigateFunction } from 'react-router';
import { useAppSelector } from '../../hook';
import Button from '../Button/Button';

export default function NoteTextSection() {
    const noteId = useAppSelector(state => state.noteIdReducer.noteId);
    const navigate: NavigateFunction = useNavigate();
    const [result, setResult] = useState<NoteDb | undefined>();

    const refToRequiredNote: DatabaseReference = ref(db, `/notes/${noteId}`)

    useEffect(() => {
        getOneElementFromDB<NoteDb>(refToRequiredNote)
            .then( (data: NoteDb | undefined) =>  data ? setResult(data) : null )
    }, []);

    function saveNote() {
        if (result) {
            setDb<NoteDb>(refToRequiredNote, result);
        }
        navigate('/');
    }

    function deleteNote() {
        deleteDb(refToRequiredNote);
        navigate('/');
    }

    function changeResult<T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>, type: 'title' | 'content') {
        setResult((prev: NoteDb | undefined) => {
            if (!prev) {
                return undefined
            } else if (type === 'title') {
                return {
                    ...prev,
                    title: event.target.value
                }
            } else if (type === 'content') {
                return {
                    ...prev,
                    content: event.target.value
                }
            }
        })
    }

    return (
        <section className="note-text">
            <div className='note-text__wrapper-buttons'>
                <Link to='/' className='button'>На главную</Link>
                <Button onClick={saveNote}>Сохранить</Button>
                <Button onClick={deleteNote}>Удалить заметку</Button>
            </div>
            <div className='note-text__wrapper-texts'>
                <input 
                    className='note-text__input' 
                    type="text" 
                    placeholder='Введите заголовок' 
                    value={result?.title} 
                    onChange={ (event) => changeResult<HTMLInputElement>(event, 'title') }
                />
                <textarea 
                    placeholder='Введите текст' 
                    className="note-text__textarea" 
                    value={result?.content} 
                    onChange={ (event) => changeResult<HTMLTextAreaElement>(event, 'content') }
                ></textarea>
            </div>
        </section>
    );
}