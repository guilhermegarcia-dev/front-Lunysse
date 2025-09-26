import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const Input = ({
    label,
    type = 'text',
    error,
    className = '',
    id,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const inputId = id || `input-${Math.random.toString(36).substr(2,9)}`
    const erroId = error ? `${inputId}-error` : undefined;
    return (
        <div className="space-y-l">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-dark">
                    {label}
                    </label>
            )}
            <div className="relative">
                <input
                    id={inputId}
                    type={inputType}
                    aria-invalid = {error ? "true" : "false"}
                    aria-describedby={erroId}
                    {...props}
                 />
                {isPassword && (
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // ✅ correto
                    className="absolute right-3 top-1/2 transform text-dark hover:text-dark/30 transition-colors"
                    aria-label={showPassword ? "ocultar senha" : "mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                  </button>
                  
                )}
            </div>
            {error && (
                <p id={errorId} className="text-sm text-red-600" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};