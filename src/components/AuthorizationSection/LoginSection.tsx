import './LoginSection.scss'
import { Link, useNavigate, type NavigateFunction } from "react-router";
import type { UserFormData } from "../../shared/types/user";
import Form from '../Form/Form';
import { setToken } from '../../utils/authService';
import type { AuthResponse } from '../../shared/types/authResponse';

export default function LoginSection() {
    const navigate: NavigateFunction = useNavigate();
    
    async function login(user: UserFormData) {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const { accessToken }: AuthResponse = await response.json();
        setToken(accessToken);
        navigate('/profile');
    }

    return (
        <section className="authorization">
            <h3 className="authorization__h3">Login</h3>
            <Form buttonText='Log in' submitFunction={login} />
            <Link to='/reg' className="authorization__link">Register</Link>
        </section>
    )
}