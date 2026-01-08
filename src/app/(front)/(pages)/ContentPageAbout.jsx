"use client";
// import DetailsHero from "@/components/Front/detailshero";

import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import LoadingComponents from "@/components/LoadingComponents";
import ContentPageAboutWord from "@/components/Front/ContentPageAboutWord";
import Image from "next/image";

const ContentPageAbout = ({ page, pageData, bannerContent, aboutBannerText }) => {
  const [mounted, setMounted] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { metaData, loading } = useAuth();
  const selectedMeta = bannerContent?.[page];
  const [slide, setSlide] = useState(0);
  const images = [
    "/images/details-img-sldier.png",
    "/images/details-img-sldier.png",
    "/images/details-img-sldier.png",
    "/images/details-img-sldier.png",
  ];
  const [tab, setTab] = useState("multi");

  



  useEffect(() => {setMounted(true);}, []);
// Prevent hydration mismatch
  if (!mounted) return null;
   //console.log('about loaded');
   //console.log(pageData);

  return (
    <>
      {/* HEADER SECTION */}

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
<div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 flex flex-col lg:flex-row gap-10 bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
<div id="featurs_section" className="py-9 md:py-5 blogpgeMain"><h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold    font-lato lg:px-10" >{pageData.title}</h1>

              
                      

                                      
  <div id="partner_section_word" >
     <div className=" pt-0 px-6  lg:pt-10 lg:px-8">
         
             {aboutBannerText.description && 
      
          <p className="mt-3 text-lg sm:text-xl lg:text-[1.400rem] lg:leading-9 text-[#221F20] font-medium font-lato" dangerouslySetInnerHTML={{ __html: aboutBannerText?.description }}></p>
            
          }
             
        </div>
      </div>
   
  
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

export default ContentPageAbout;
