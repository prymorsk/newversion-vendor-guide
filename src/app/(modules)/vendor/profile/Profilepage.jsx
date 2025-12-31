"use client";
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import ProfileForm from "./ProfileForm";
import LoadingComponents from '@/components/LoadingComponents';
import Link from "next/link";

const Profilepage = () => {
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
<section
id="hero_section"
className="inner hero-section commonpage"
>
{/* Hero Section */}
</section>

<section className="innerpage-wapper-sections">
<div className="container mx-auto">
<div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
<div id="featurs_section" className="py-9 md:py-5 ">
<h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato lg:px-10">
Profile
</h1>





      {isLoading ? (
        <div className="text-center text-xl font-semibold text-[#171717] text-left leading-[1.5rem] my-4">
          <LoadingComponents />
        </div>
      ) : (
        <>
          

                  <ProfileForm
                    user={user}
                    userAllInfo={userAllInfo}
                  />
               
        </>
      )}


  </div>
  </div>
  </div>
  </section>
    </>
  );
};

export default Profilepage;
