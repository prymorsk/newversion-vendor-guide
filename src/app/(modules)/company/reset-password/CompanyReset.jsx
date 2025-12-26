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
      <section className="inner hero-section commonpage">
        <div className="container mx-auto px-4 flex flex-row gap-4 items-center"></div>
      </section>

      <section className="innerpage-wapper-sections">
        <div className="container mx-auto">
          <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8  flex-col lg:flex-row gap-10 border border-gray-300 leading-relaxed text-gray-800">

            <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato lg:px-10">
              Change Password
            </h1>

            <div className="container mx-auto overflow-hidden xl:px-24 lg:px-8 md:px-12">
              <div className="mx-auto max-w-7xl">
                <div className="lg:mx-auto max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">

                  <ResetPasswordForm />

                 <div className="md:col-span-1 lg:col-span-1 col-span-12 order-2 sm:order-1">
                    <div className="bg-[url('/images&icons/loginback.jpg')] h-full bg-cover bg-no-repeat"></div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
