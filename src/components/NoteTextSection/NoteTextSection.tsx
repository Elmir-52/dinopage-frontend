import React, { useEffect } from 'react';
import { getOneElementFromDB } from '../../fetchRequestDB';
import type { NoteDb } from '../../App';
import './_NoteTextSection.scss';
import { db } from '../../../lib/fierbase';
import { ref, type DatabaseReference } from 'firebase/database';
import { useAppDispatch, useAppSelector } from '../../hook';
import { setRequedNote, type RequiredNoteActionPayload } from '../../store/requiredNoteSlice';

export default function NoteTextSection() {
    const noteId = useAppSelector(state => state.noteIdReducer.noteId);
    const { ...requiredNote } = useAppSelector(state => state.requiredNoteReducer.requiredNote);
    const dispatch = useAppDispatch();

    const refToRequiredNote: DatabaseReference = ref(db, `/notes/${noteId}`)

    useEffect(() => {
        getOneElementFromDB<NoteDb>(refToRequiredNote)
            .then( (data: NoteDb | undefined) =>  {
                if (data) {
                    const requiredNoteActionPayload: RequiredNoteActionPayload = {
                        requiredNote: data,
                    };

                    dispatch(setRequedNote(requiredNoteActionPayload));
                }
            })
    }, []);

    function changeResult<T extends HTMLInputElement | HTMLTextAreaElement>(event: React.ChangeEvent<T>, type: 'title' | 'content') {
        if (type === 'title') {
            requiredNote.title = event.target.value;
            dispatch(setRequedNote({ requiredNote }));
            return;
        }

        if (type === 'content') {
            requiredNote.content = event.target.value;
            dispatch(setRequedNote({ requiredNote }));
            return;
        }
    }

    return (
        <section className="note-text">
            <div className='note-text__wrapper-texts'>
                <input 
                    className='note-text__input' 
                    type="text" 
                    placeholder='Введите заголовок' 
                    value={requiredNote.title} 
                    onChange={ (event) => changeResult<HTMLInputElement>(event, 'title') }
                />
                <textarea 
                    placeholder='Введите текст' 
                    className="note-text__textarea" 
                    value={requiredNote.content} 
                    onChange={ (event) => changeResult<HTMLTextAreaElement>(event, 'content') }
                ></textarea>
            </div>
        </section>
    );
}