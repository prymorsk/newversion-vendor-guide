"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import ProfileForm from "./ProfileForm";
import LoadingComponents from "@/components/LoadingComponents";

const Profilepage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getCookie("token")) {
      router.push("/");
    }

    if (user) {
      setIsLoading(false);
    }
  }, [user, router]);

  return (
    <>


    <section id="hero_section" className="inner hero-section commonpage">
            {/* Hero Section */}
          </section>

          <section className="innerpage-wapper-sections">
            <div className="container mx-auto">
              <div className="infobox-details w-full mx-auto bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
                <div id="featurs_section" className="py-9 md:py-5">
                  <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato lg:px-10">
                    Profile
                  </h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <LoadingComponents />
        </div>
      ) : (
        <>
          

                  <ProfileForm user={user} />
               
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
