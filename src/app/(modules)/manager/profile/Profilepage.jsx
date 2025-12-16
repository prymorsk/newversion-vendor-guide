"use client";
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import ProfileForm from "./ProfileForm";
import LoadingComponents from '@/components/LoadingComponents';

const Profilepage = () => {
    const {user,userAllInfo}  = useAuth();

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(user){
            setIsLoading(false);
        }
    }, [user]);
  
    return (
        <>
        {
            isLoading ? 
            <div className="text-center text-xl font-semibold text-[#171717] text-left leading-[1.5rem] my-4">
            <LoadingComponents />
          </div> :<ProfileForm user={user} userAllInfo={userAllInfo} />
        }
            
        </>
    );
};

export default Profilepage;