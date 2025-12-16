"use client"; // Required for client-side components using hooks or dynamic data

import Link from "next/link";
import Image from "next/image";

const DetailsHero = ({ filterData, backgroundImage }) => {
  const vendor_details = backgroundImage?.details_background;
  console.log('loading hero');

  return (
    <>
    <section id="hero_section" className="inner hero-section commonpage" 
      style={{
      backgroundImage: backgroundImage.details_background
      ? `url(${backgroundImage.details_background})`
      : "none",
      }}
      >
      {/* Hero Section */}
      </section>
    </>
  );
};

export default DetailsHero;
