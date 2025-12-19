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
<<<<<<< HEAD
          
       <TopBannerSearch title="Search Results" backgroundimage={searchMeta} vendors={''} />
=======

        <TopBannerSearch title="Search Results" backgroundimage={searchMeta} vendors={''} />
>>>>>>> 7f992af15832be37d90e29cd94470fc305cc9b10

      {/* <BannerSectionCard /> */}
      <SearchAllData states={states}  backgroundimage={searchMeta} vendors={''} />
    </>
  );
};

export default Searchpage;
