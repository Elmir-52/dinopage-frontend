import './RegistrationSection.scss'
import { useNavigate, type NavigateFunction } from "react-router";
import type { UserFormData } from "../../shared/types/user";
import Form from "../Form/Form";
import type { AuthResponse } from '../../shared/types/authResponse';
import { setToken } from '../../utils/authService';

export default function RegistrationSection() {
    const navigate: NavigateFunction = useNavigate();

    async function registration(user: UserFormData) {
        const response = await fetch('http://localhost:3000/auth/register', {
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
        <section className="registration">
            <h3 className="registration__h3">Registration</h3>
            <Form buttonText="Register" submitFunction={registration} />
        </section>
    )
}