'use client'

import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { HttpError } from "@/shared/api";
import { UserFormData, UserFormDataSchema } from "../../model/userFormData";
import { EmailField } from "../EmailField/EmailField";
import { PasswordField } from "../PasswordField/PasswordField";

export interface IForm {
    email: string;
    password: string;
}

interface FormProps {
    buttonText: string;
    submitFunction: (user: UserFormData) => Promise<void>;
}

export default function Form({ buttonText, submitFunction }: FormProps) {
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

            <EmailField
                register={register}
                emailError={emailError}
            />

            <PasswordField
                register={register}
                passwordError={passwordError}
            />
        
            <button 
                className="mt-6.5 px-12.5 py-3 rounded-xl cursor-pointer text-xl 
                bg-black text-white"
            >
                {buttonText}
            </button>
        </form>
    );
}