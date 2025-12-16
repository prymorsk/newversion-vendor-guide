import React, { useState } from "react";
// import {useNavigate} from "react-router-dom";
// import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
export const useForm = () => {
    let navigate = useRouter();
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState('');
    function renderFieldError(field) {
        if(errors && errors.hasOwnProperty(field)) {
            return errors[field][0] ? (
                <span className="text-[#c13e27] text-sm font-normal" role="alert"><strong>{errors[field][0]}</strong></span>
            ) : null;
        }
        return null;
    }
    return {
        navigate,
        errors,
        setErrors,
        message,
        setMessage,
        renderFieldError
    }
}