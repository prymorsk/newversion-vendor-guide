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

console.log('blog loading...');
//console.log(bannerContent);



  return (
    <>
      <TopBanner resourceMeta={bannerContent || {}} />

      <div className="pt-[34rem] product_section sm:pt-[21rem] md:pt-[18rem] lg:pt-[19rem] xl:pt-[26rem] 2xl:pt-[24rem]">
        <ResourceListCards title="Read Our Latest Blogs" />

        {/* <Pagination /> */}
      </div>
    </>
  );
};

export default Resourcespage;
