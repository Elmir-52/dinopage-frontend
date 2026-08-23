import { UseFormRegister } from "react-hook-form";
import { useId, useState } from "react";
import { PasswordEyeButton } from "../PasswordEyeButton/PasswordEyeButton";
import { IForm } from "../../model/useForm.m";

interface PasswordFieldProps {
    register: UseFormRegister<IForm>;
    passwordError: string | undefined
}

export function PasswordField({ register, passwordError }: PasswordFieldProps) {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const inputId = useId();

    return (
        <div className="w-[90%] h-12 relative">
            {passwordError && 
                <label 
                    className="text-xs absolute top-12.5 text-red-600" 
                    htmlFor={inputId}
                >
                    {passwordError}
                </label>
            }

            <input
                id={inputId}
                className={`w-full h-full text-2xl px-2 border-b-2 border-solid  focus:outline-0 focus:border-blue-600
                ${passwordError ? 'border-red-600' : 'border-gray-500'}`}
                type={isPasswordShown ? 'text' : 'password'} 
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

            <PasswordEyeButton 
                isPasswordShown={isPasswordShown}
                onClick={() => setIsPasswordShown(prev => !prev)}
            />
        </div>
    )
}