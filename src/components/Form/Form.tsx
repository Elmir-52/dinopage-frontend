import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import openEyeImage from '/openeye.svg';
import closeEyeImage from '/closeeye.svg';
import type { UserFormData } from "../../shared/types/user";
import { UserFormDataSchema } from "../../schemas/userFormData";
import { HttpError } from "../../errors/httpError";

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
            if (error instanceof Error || error instanceof HttpError) {
                setError('root', { type: 'manual', message: error.message });
            }
        }
    }

    return (
        <form 
            className="flex flex-col justify-center items-center bg-white w-[90%] h-75 gap-7.5 
            rounded-2xl relative md:w-[70%] lg:w-[50%]" 
            onSubmit={handleSubmit(onSubmit)}
        >
            {rootError && <label 
                    className="text-xs absolute top-2.5 text-red-600"
                >
                    {rootError}
                </label>
            } 

            <div className="w-[90%] h-12 relative">
                {emailError && 
                    <label 
                        className="text-xs absolute top-12.5 text-red-600" 
                        htmlFor="email"
                    >
                        {emailError}
                    </label>
                }

                <input 
                    className={emailError ? 
                        'w-full h-full text-2xl px-2 border-b-2 border-solid border-red-600 focus:outline-0 focus:border-blue-600' :
                        'w-full h-full text-2xl px-2 border-b-2 border-solid border-gray-500 focus:outline-0 focus:border-blue-600'
                    }
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

            <div className="w-[90%] h-12 relative">
                {passwordError && 
                    <label 
                        className="text-xs absolute top-12.5 text-red-600" 
                        htmlFor="email"
                    >
                        {passwordError}
                    </label>
                }

                <input
                    className={passwordError ? 
                        'w-full h-full text-2xl px-2 border-b-2 border-solid border-red-600 focus:outline-0 focus:border-blue-600' :
                        'w-full h-full text-2xl px-2 border-b-2 border-solid border-gray-500 focus:outline-0 focus:border-blue-600'
                    }
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
                    className="w-8 cursor-pointer absolute top-3 right-3"
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)} 
                >
                    <img
                        className="w-full"
                        src={showPassword ? openEyeImage : closeEyeImage} 
                        alt="иконка глаза" 
                    />
                </button>
            </div>
        
            <button 
                className="mt-6.5 px-12.5 py-3 rounded-xl cursor-pointer text-xl 
                bg-black text-white"
            >
                {buttonText}
            </button>
        </form>
    );
}