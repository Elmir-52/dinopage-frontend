import { useNavigate, type NavigateFunction } from "react-router";
import type { UserFormData } from "../../shared/types/user";
import Form from "../Form/Form";
import type { AuthResponse } from '../../shared/types/authResponse';
import { setToken } from '../../utils/authService';
import { HttpError } from '../../errors/httpError';

export default function RegistrationSection() {
    const navigate: NavigateFunction = useNavigate();

    async function registration(user: UserFormData) {
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            const data = await response.json();
    
            if (response.status === 409) {
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
            <h3 className="font-[Nunito] text-5xl font-medium mb-4">Registration</h3>
            <Form buttonText="Register" submitFunction={(user: UserFormData) => registration(user)} />
        </section>
    )
}