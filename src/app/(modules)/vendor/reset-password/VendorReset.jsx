"use client";

import Right from "@/components/Front/Auth/Right";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import LoadingComponents from '@/components/LoadingComponents';
import Link from "next/link";


const Page = () => {

const { user, userAllInfo } = useAuth();
  const TopBarImage = "/images&icons/advertise/banner1.jpg";

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);







  return (
    <>
      {isLoading ? (
        <div className="text-center text-xl font-semibold text-[#171717] text-left leading-[1.5rem] my-4">
          <LoadingComponents />
        </div>
      ) : (
        <>
          
                  <ResetPasswordForm />
                   <Right />

                  
        </>
      )}
    </>
  );
};

export default Page;
