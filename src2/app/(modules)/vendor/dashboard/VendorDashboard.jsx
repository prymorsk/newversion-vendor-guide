"use client";


import TabComponent from "../components/TabComponent";
import DashboardTopPage from "./DashboardTopPage";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import { useState, useEffect } from "react";
import LoadingComponents from "@/components/LoadingComponents";


 function VendorDashboard() {

  const [mounted, setMounted] = useState(false);
  
  const TopBarImage = "/images&icons/advertise/banner1.jpg";

  const { metaData, loading, user } = useAuth();
  const advertiseMeta = metaData?.advertise;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  console.log('venodr loaded...');
  




  return (
    <>

<section id="hero_section" className="inner hero-section commonpage" >
{/* Hero Section */}
</section>
   
<section className="innerpage-wapper-sections">
<div className="container mx-auto">
  <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8   bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
<div id="featurs_section" className="py-9 md:py-5 "><h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold    font-lato lg:px-10" >Vendor Dashboard</h1>


      <section className="top_grid">
        <div className="px-20">
           <DashboardTopPage />
        </div>
      </section>
      <section className="pt-14">
        <div className="px-10">
          <TabComponent/>
        </div>
      </section>

       </div>
      </div>
     </div>
    </section>
    </>
  );
};

export default VendorDashboard;