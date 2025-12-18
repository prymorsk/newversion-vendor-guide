"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const useForm = () => {
    const navigate = useRouter(); // next/navigation hook
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState('');

    function renderFieldError(field) {
        if (errors && Object.prototype.hasOwnProperty.call(errors, field)) {
            return errors[field][0] ? (
                <span className="text-[#c13e27] text-sm font-normal" role="alert">
                    <strong>{errors[field][0]}</strong>
                </span>
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
    };
};
