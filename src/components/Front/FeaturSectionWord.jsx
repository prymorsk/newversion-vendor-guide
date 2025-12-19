"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/UserContext";
import Image from "next/image";


const FeaturSectionWord = ({ blogs, homeBannerText }) => {
  const { user, isLoding, isInfoLoding, logout } = useAuth();

  // Log only once on mount
  useEffect(() => {
    console.log("homeBannerText", homeBannerText);
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
                <Image src="/images/welcome-img.png" alt="welcome" width={500} height={500} />
              </div>
            </div>

             <div class="w-full md:w-[60%]">
		  	<div class="welcome-intro-content">
		  		<div class="title">
		  			<span>Welcome to</span>
		  			<h2>Vendor Guide Online</h2>
		  		</div>
		  		<div class="paragraph">
		  			<p>Welcome to VendorGuideOnline.com, the ultimate online search destination for apartment managers seeking top-notch vendors, suppliers, and service providers for their multi-family properties. </p>
					<p>Whether you need expert apartment painting, reliable multi-family roofing, comprehensive apartment renovation, smart tech installation, or so much more, we've got you covered. </p>
					<p>Our platform connects you with skilled professionals in over 90 categories, including those specializing in advertising and promotion, apartment turns, resident screening, property restoration, apartment cleaning, and building exteriors services, with vendors that are experienced in the nuances of working in the multi-family industry. </p>
					<p>Discover a wide array of trusted suppliers and service providers, ensuring your apartment property’s needs are met with the highest quality and efficiency.</p>
		  		</div>

		  	</div>

		  </div>

            
          </div>
        </div>

      </section>
    
  );
};

export default FeaturSectionWord;
