import { FormState, UseFormClearErrors, UseFormWatch } from "react-hook-form";
import { IForm } from "./useForm.m";
import { useEffect } from "react";

export function useFormErrorsModel(
    watch: UseFormWatch<IForm>,
    formState: FormState<IForm>,
    clearErrors: UseFormClearErrors<IForm>
) {
    const rootError = formState.errors.root?.message
    const emailError = formState.errors.email?.message;
    const passwordError = formState.errors.password?.message;
    
    // при вводе символов в поля, чистим root error
    const emailWatch = watch('email');
    const passwordWatch = watch('password');

    useEffect(() => {
        if (rootError) {
            clearErrors('root');
        }
    }, [ emailWatch, passwordWatch ]);

    return {
        rootError,
        emailError,
        passwordError,
    }
}