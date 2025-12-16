"use client";
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import ProfileForm from "./ProfileForm";

const Profilepage = () => {
    const {user}  = useAuth();

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(!getCookie('token')){
            router.push('/');
        }
        if(user){
            setIsLoading(false);
        }
    }, [user]);
  
    return (
        <>
        {
            isLoading ? 'Loading...' :<ProfileForm user={user} />
        }
            
        </>
    );
};

export default Profilepage;