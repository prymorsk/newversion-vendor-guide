"use client"; // Required for client-side components using hooks or dynamic data

import Link from "next/link";
import Image from "next/image";

const DetailsHero = ({ filterData, backgroundImage }) => {
  const metabanner = backgroundImage?.details_background;

const vendorMainImage = filterData?.vendormainimgedit || [];
const Dyn_vendor_banner=vendorMainImage?.[0]?.vendormainimageview?.vendormain_image_url ?? metabanner;

 //console.log('vendorMainImage');
 //console.log(Dyn_vendor_banner);
 //console.log('vendorMainImage end');

  

  return (
    <>
    <section id="hero_section" className="inner hero-section commonpage" 
      style={{
      backgroundImage: Dyn_vendor_banner
      ? `url(${Dyn_vendor_banner})`
      : "none",
      }}
      >
      {/* Hero Section */}
      </section>
    </>
  );
};

export default DetailsHero;
