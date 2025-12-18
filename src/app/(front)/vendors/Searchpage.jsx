"use client"; // Ensure this component runs on the client

import TopBannerSearch from "@/components/Front/TopBannerSearch";
import SearchAllData from "./SearchAllData";

const Searchpage = ({ bannerContent, states }) => {
  const searchMeta = bannerContent.search_background;

  return (
    <>

    <section id="hero_section" className="inner hero-section commonpage" 
      style={{
      backgroundImage: searchMeta
      ? `url(${searchMeta})`
      : "none",
      }}
      >
      {/* Hero Section */}
      </section>
      
      {/* <BannerSectionCard /> */}
      <SearchAllData states={states} />
    </>
  );
};

export default Searchpage;
