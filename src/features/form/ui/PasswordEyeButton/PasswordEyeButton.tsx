import { Eye, EyeOff } from "lucide-react";

interface PasswordEyeButtonProps {
    isPasswordShown: boolean,
    onClick: () => void;
}

export function PasswordEyeButton({ isPasswordShown, onClick }: PasswordEyeButtonProps) {
    return (
        <button 
            className="cursor-pointer absolute top-3 right-3"
            type="button" // type="button", чтобы кнопка глазик случайно не делала submit формы
            onClick={onClick}
        >
            {isPasswordShown ?
                <Eye size={30}/> :
                <EyeOff size={30}/>
            }
        </button>
    )
}