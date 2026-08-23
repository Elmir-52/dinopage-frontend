import { SubmitHandler, useForm } from "react-hook-form";
import { UserFormData, UserFormDataSchema } from "./userFormData";

export interface IForm {
    email: string;
    password: string;
}

export function useFormModel(
    submitFunction: (user: UserFormData) => Promise<void>
) {
    const { register, handleSubmit, formState, watch, setError, clearErrors } = useForm<IForm>({
        mode: 'onChange',
    });

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

    return {
        register, 
        handleSubmit, 
        formState, 
        watch, 
        clearErrors,
        onSubmit,
    }
}