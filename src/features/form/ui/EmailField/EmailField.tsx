import { UseFormRegister } from "react-hook-form";
import { IForm } from "../Form/Form";
import { useId } from "react";

interface EmailFieldProps {
    register: UseFormRegister<IForm>;
    emailError: string | undefined
}

export function EmailField({ register, emailError }: EmailFieldProps) {
    const inputId = useId();

    return (
        <div className="w-[90%] h-12 relative">
            {emailError && 
                <label 
                    className="text-xs absolute top-12.5 text-red-600" 
                    htmlFor={inputId}
                >
                    {emailError}
                </label>
            }

            <input 
                id={inputId}
                className={`w-full h-full text-2xl px-2 border-b-2 border-solid  focus:outline-0 focus:border-blue-600
                ${emailError ? 'border-red-600' : 'border-gray-500'}`}
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
    )
}