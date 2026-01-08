"use client";
// import DetailsHero from "@/components/Front/detailshero";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import LoadingComponents from "@/components/LoadingComponents";
import Image from "next/image";

const ContentPage = ({ page, pageData, bannerContent }) => {
  const [mounted, setMounted] = useState(false);

  const { metaData, loading } = useAuth();
  const selectedMeta = bannerContent?.[page];

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // IMPORTANT for Next.js 15 hydration

 //console.log(pageData.slug);
 //console.log(pageData);
  return (
    <>
    <section id="hero_section" className="inner hero-section commonpage" 
      style={{
      backgroundImage: selectedMeta.background
      ? `url(${selectedMeta.background})`
      : "none",
      }}
      >
      {/* Hero Section */}
      </section>
  
  
  
  
  
  
  {/* Blog Content Section */}
<section className="innerpage-wapper-sections">
<div className="container mx-auto">
<div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8  flex-col lg:flex-row gap-10 bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">

<div id="featurs_section" className="py-9 md:py-5 blogpgeMain">

  {pageData.title && 
  <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[3rem] font-lato -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold     font-lato lg:px-10">
  {pageData.title}
  </h1>}


    
   
  
      <div className="mx-auto ">
      <div className="mt-12">

      <div className="text-[#647589] text-lg font-medium font-lato leading-8" dangerouslySetInnerHTML={{ __html: pageData.description }} />


      </div>
      </div>
                         

                              



                  </div>
                </div>
              </div>
           </section>


    </>
  );
};

export default ContentPage;
