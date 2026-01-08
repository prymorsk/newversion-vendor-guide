"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/UserContext";
import Image from "next/image";


const FeaturSectionWord = ({ blogs, homeBannerText }) => {
  const { user, isLoding, isInfoLoding, logout } = useAuth();

  // Log only once on mount
  useEffect(() => {
   // console.log("homeBannerText", homeBannerText);
  }, [homeBannerText]);

  // Memoize description so UI doesn't re-render unnecessarily
  const bannerDescription = useMemo(() => {
    return homeBannerText?.description || "";
  }, [homeBannerText?.description]);

  return (


<section className="welcome-sections pt-24 pb-25p24">
        <div className="container mx-auto welcome-intro">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-[40%]">
              <div className="welcome-intro-image">
                <Image src="/images/welcome-img.webp" alt="welcome" width={500} height={500} />
              </div>
            </div>

             <div className="w-full md:w-[60%]">
		  	<div className="welcome-intro-content">
		  		<div className="title">
		  			<span>Welcome to</span>
		  			<h2>Vendor Guide Online</h2>
		  		</div>

          <div
            className="paragraph"
            dangerouslySetInnerHTML={{ __html: bannerDescription }}
          />


		  	</div>

		  </div>

            
          </div>
        </div>

      </section>
    
  );
};

export default FeaturSectionWord;
