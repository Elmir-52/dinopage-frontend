import { useNavigate, useParams } from 'react-router';
import Button from '../Button/Button';
import './NoteTab.scss';
import { getToken } from '../../utils/authService';
import { refreshTokens } from '../../utils/refreshTokens';

export default function NoteTab() {
    const { noteId } = useParams();
    const navigate = useNavigate();
    
    let accessToken = getToken();

    async function deleteNote() {
        try {
            const response = await fetch(`http://localhost:3000/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            
            if (response.status === 401) {
                await refreshTokens(navigate);
                                        
                accessToken = getToken();
                await fetch(`http://localhost:3000/notes/${noteId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
            }

            navigate('/');
        } catch(error) {
            console.error(error);
        }
    }

    return(
        <div className="note-tab">
            <Button onClick={() => { navigate('/') }} className="note-tab__button">
                H
                {/* <img src="" title="на главную"/> */}
            </Button>
            <Button onClick={() => deleteNote()} className="note-tab__button">
                <img src="/delete-icon.png" title="удалить"/>
            </Button>
        </div>
    );
}