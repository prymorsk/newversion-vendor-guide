"use client";

import FeaturSection2 from "@/components/Front/FeaturSection2";
import AdvertiseTable from "@/components/Front/AdvertiseTable";
import Link from "next/link";
import HeroSection from "@/components/Front/HeroSection";
import PartnerSection2 from "@/components/Front/PartnerSection2";
import { useAuth } from "@/context/UserContext";
import { useState, useEffect } from "react";
import LoadingComponents from "@/components/LoadingComponents";

const Advertisepage = ({ bannerContent }) => {
  const [mounted, setMounted] = useState(false);
  
const TopBarImage = "/images&icons/advertise/banner1.jpg";

  const pagemetaData = bannerContent;
  const { metaData, loading, user } = useAuth();
  const advertiseMeta = metaData?.advertise;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  //console.log('advertise loaded...');
  //console.log(bannerContent);
  

  return (
    <>
      
 <section id="hero_section" className="inner hero-section commonpage" 
      style={{
      backgroundImage: pagemetaData.background
      ? `url(${pagemetaData.background})`
      : "",
      }}
      >
      {/* Hero Section */}
      </section>
<section className="innerpage-wapper-sections">
<div className="container mx-auto">
  <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8   bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
<div id="featurs_section" className="py-9 md:py-5 "><h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold    font-lato lg:px-10" >{pagemetaData?.advertise_title}</h1>



      <div id="featurs_section" className="py-10 sm:pt-14 md:pt-8">
        <div className="overflow-hidden bg-white md:py-8 lg:py-12 px-3 xl:ps-16">
          <div className="mx-auto max-w-7xl px-4 md:px-9">
            <FeaturSection2 />
          </div>
        </div>
      </div>

      <div
        id="advertise_section"
        style={{
          backgroundImage: `url(images&icons/advertise/pattern.png)`,
        }}
        className="bg-bottom-left bg-no-repeat bg-contain"
      >
        <div className="py-5 px-8 lg:py-12 md:px-16 md:ps-16 overflow-x-auto">
          <div className="max-w-7xl lg:px-9 grid grid-cols-12 gap-5 mx-auto">
            <div className="col-span-12 xl:col-span-12">
              <div className="card">
                <div className="card-body pb-8 md:pb-14">
                  <h2 className="mb-1 text-xl lg:text-4xl md:text-2xl text-[#221F20] font-bold font-lato">
                    Choose Your Advertising Package:
                  </h2>
                </div>

                <div className="card-body">
                  <div className="relative overflow-x-auto overflow-y-hidden">
                    <AdvertiseTable user={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PartnerSection2
            title={pagemetaData?.advertise_text}
            btnTitle="Contact Us Today"
          />

        </div>
        </div>
      </div>
     </div>
      </section>
    </>
  );
};

export default Advertisepage;
