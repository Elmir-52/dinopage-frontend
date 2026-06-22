import { Link, useNavigate, type NavigateFunction } from "react-router";
import type { UserFormData } from "../../shared/types/user";
import Form from '../Form/Form';
import { setToken } from '../../utils/authService';
import type { AuthResponse } from '../../shared/types/authResponse';
import { HttpError } from '../../errors/httpError';

export default function LoginSection() {
    const navigate: NavigateFunction = useNavigate();
    
    async function login(user: UserFormData) {
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            const data = await response.json();
    
            if (response.status === 401) {
                throw new HttpError(response.status, data.message);
            }
    
            if (!response.ok) {
                throw new Error();
            }
    
            const { accessToken }: AuthResponse = data;
            setToken(accessToken);
            navigate('/profile');
        } catch(error) {
            if (error instanceof HttpError) throw error;

            if (!navigator.onLine) {
                throw new Error('Turn on your Wi-Fi or mobile Internet')
            }
            
            throw new Error('Something went wrong, please try again later');
        }
    }

    return (
        <section className="flex flex-col items-center gap-8">
            <h3 className="font-[Nunito] text-5xl font-medium">Login</h3>
            <Form buttonText='Log in' submitFunction={(user: UserFormData) => login(user)} />
            
            <Link 
                to='/reg' 
                className="font-[Nunito] text-2xl text-blue-600 underline"
            >
                Register
            </Link>
        </section>
    )
}