"use client"; // Ensure this component runs on the client

import TopBannerSearch from "@/components/Front/TopBannerSearch";
import SearchAllData from "./SearchAllData";

const Searchpage = ({ bannerContent, states }) => {
  const searchMeta = bannerContent.search_background;

  return (
    <>
      <TopBannerSearch 
        title="Search Results" 
        backgroundimage={searchMeta} 
        vendors={''} 
      />
      {/* <BannerSectionCard /> */}
      <SearchAllData states={states} />
    </>
  );
};

export default Searchpage;
