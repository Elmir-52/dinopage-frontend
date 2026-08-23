import { useFormModel } from "./useForm.m";
import { useFormErrorsModel } from "./useFormErrors.m";
import { UserFormData } from "./userFormData";

export function useFormViewModel(
    submitFunction: (user: UserFormData) => Promise<void>
) {
    const {
        register, 
        handleSubmit, 
        formState, 
        watch, 
        clearErrors,
        onSubmit,
    } = useFormModel(submitFunction);

    const {
        rootError,
        emailError,
        passwordError,
    } = useFormErrorsModel(watch, formState, clearErrors);

    return {
        register,
        handleSubmit,
        onSubmit,
        rootError,
        emailError,
        passwordError,
    }
}