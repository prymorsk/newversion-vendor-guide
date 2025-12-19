"use client";
import Right from "@/components/Front/Auth/Right";
import ResetPasswordForm from "@/components/ResetPasswordForm";

import Link from "next/link";
import HeroSection from "@/components/Front/HeroSection";
import { useAuth } from "@/context/UserContext";
import { useState, useEffect } from "react";
import LoadingComponents from "@/components/LoadingComponents";

import TabComponent from "@/components/Front/TabComponent";


const Page = () => {

  const [mounted, setMounted] = useState(false);
  
const TopBarImage = "/images&icons/advertise/banner1.jpg";

  const { metaData, loading, user } = useAuth();
  const advertiseMeta = metaData?.advertise;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;




  return (
    <>
<section id="hero_section" className="inner hero-section commonpage" >
  {/* Hero Section */}
  </section>

      
<section className="innerpage-wapper-sections">
<div className="container mx-auto">
  <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8   bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
<div id="featurs_section" className="py-9 md:py-5 "><h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold    font-lato lg:px-10" >Reset Password</h1>

      <div className="container mx-auto overflow-hidden xl:px-24 lg:px-8 md:px-12 ">
        <div className="mx-auto max-w-7xl">
          <div className="lg:mx-auto  max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">

            <ResetPasswordForm />
            <Right />

          </div>
        </div>
      </div >

 </div>
      </div>
     </div>
    </section>



    </>
  );
};

export default Page;
