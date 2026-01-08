import Image from "next/image";

const HeroSection = ({bannerData}) => {
  
  return (

<section id="hero_section" className="inner hero-section commonpage" 
      style={{
      backgroundImage: bannerData.advertise_background
      ? `url(${bannerData.advertise_background})`
      : "none",
      }}
      >
      {/* Hero Section */}
      </section>
    
  );
};

export default HeroSection;
