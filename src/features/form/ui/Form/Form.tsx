'use client'

import { UserFormData } from "../../model/userFormData";
import { EmailField } from "../EmailField/EmailField";
import { PasswordField } from "../PasswordField/PasswordField";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { RootErrorLabel } from "../RootErrorLabel/RootErrorLabel";
import { useFormViewModel } from "../../model/useForm.vm";

interface FormProps {
    submitButtonContent: string;
    submitFunction: (user: UserFormData) => Promise<void>;
}

export default function Form({ submitButtonContent, submitFunction }: FormProps) {
    const {
        register,
        handleSubmit,
        onSubmit,
        rootError,
        emailError,
        passwordError,
    } = useFormViewModel(submitFunction);

    return (
        <form 
            className="flex flex-col justify-center items-center bg-white w-[90%] h-75 gap-7.5 
            rounded-2xl relative md:w-[70%] lg:w-[50%]" 
            onSubmit={handleSubmit(onSubmit)}
        >
            <RootErrorLabel rootError={rootError}/>

            <EmailField
                register={register}
                emailError={emailError}
            />

            <PasswordField
                register={register}
                passwordError={passwordError}
            />
        
            <SubmitButton>
                {submitButtonContent}
            </SubmitButton>
        </form>
    );
}