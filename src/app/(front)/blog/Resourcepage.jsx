"use client";

import { useState, useEffect } from "react";
import ResourceListCards from "@/components/Front/ResourceListCards";
import TopBanner from "@/components/Front/TopBanner";
import { useAuth } from "@/context/UserContext";

const Resourcespage = ({ bannerContent }) => {
  const [mounted, setMounted] = useState(false);

  // Using context (even if not required) stabilizes render timing
  const { metaData, loading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

//console.log('blog loading...');
//console.log(bannerContent);



  return (
    <>
<section id="hero_section" className="inner hero-section commonpage" 
      style={{
      backgroundImage: bannerContent.resources_background
      ? `url(${bannerContent.resources_background})`
      : "none",
      }}
      >
      {/* Hero Section */}
      </section>



<section className="innerpage-wapper-sections">
<div className="container mx-auto">
<div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8  flex-col lg:flex-row gap-10 bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">



<h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold    font-lato lg:px-10" >{bannerContent?.resources_title}</h1>

       
 <TopBanner resourceMeta = {bannerContent}/>  

        <ResourceListCards title="Read Our Latest Blogs" />

        {/* <Pagination /> */}
      
                </div>
              </div>
           </section>
    </>
  );
};

export default Resourcespage;
