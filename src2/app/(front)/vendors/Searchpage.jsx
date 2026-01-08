"use client"; // Ensure this component runs on the client

import TopBannerSearch from "@/components/Front/TopBannerSearch";
import SignUpcardNew from "@/components/Front/SignUpcardNew";

import SearchAllData from "./SearchAllData";

const Searchpage = ({ bannerContent, states }) => {
  const searchMeta = bannerContent.search_background;

  return (
    <>

    

          
      <SignUpcardNew title="Search Results" backgroundimage={searchMeta} vendors={''} />



      {/* <BannerSectionCard /> */}
      <SearchAllData states={states}  backgroundimage={searchMeta} vendors={''} />
    </>
  );
};

export default Searchpage;
