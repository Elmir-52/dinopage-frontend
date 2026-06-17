import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import './Form.scss';
import type { UserFormData } from "../../shared/types/user";
import { UserFormDataSchema } from "../../schemas/userFormData";

interface IForm {
    email: string;
    password: string;
}

interface FormProps {
    buttonText: string;
    submitFunction: (user: UserFormData) => Promise<void>;
}

export default function Form({ buttonText, submitFunction }: FormProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { register, handleSubmit, formState, watch, setError, clearErrors } = useForm<IForm>({
        mode: 'onChange',
    });

    const rootError = formState.errors.root?.message
    const emailError = formState.errors.email?.message;
    const passwordError = formState.errors.password?.message;
    
    const emailWatch = watch('email');
    const passwordWatch = watch('password');
    
    useEffect(() => {
        if (rootError) {
            clearErrors('root');
        }
    }, [ emailWatch, passwordWatch ]);
    
    const onSubmit: SubmitHandler<IForm> = async (data) => {
        const result = UserFormDataSchema.safeParse(data);
        
        if (result.error) {
            setError('root', { type: 'manual', message: 'Invalid data' });
            return;
        }

        try {
            await submitFunction(result.data);
        } catch(error) {
            if (error instanceof Error) {
                setError('root', { type: 'manual', message: error.message });
            }
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            {rootError && <label className="form__global-error">{rootError}</label>} 
            <div className="form__wrapper">
                {emailError && <label htmlFor="email">{emailError}</label>}
                <input 
                    id="email"
                    className={emailError && 'form__invalid'}
                    type="email" 
                    placeholder='email' 
                    autoComplete="email"
                    {...register('email', {
                        required: 'This field is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email"
                        }
                    })}
                />
            </div>

            <div className="form__wrapper">
                {passwordError && <label htmlFor="email">{passwordError}</label>}
                <input
                    id="password"
                    className={passwordError && 'form__invalid'}
                    type={showPassword ? 'text' : 'password'} 
                    placeholder='password' 
                    autoComplete="current-password"
                    {...register('password', {
                        required: 'This field is required',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                            message: "Password must be at least 8 characters, including uppercase, lowercase, a number and special character"
                        }
                    })}
                />
                <button 
                    className="form__open-eye"
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)} 
                >
                    <img
                        src={showPassword ? openEyeImage : closeEyeImage} 
                        alt="иконка глаза" 
                    />
                </button>
            </div>
        
            <button className="form__button" >
                {buttonText}
            </button>
        </form>
    );
}