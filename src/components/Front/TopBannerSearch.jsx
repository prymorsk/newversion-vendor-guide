"use client"; // Required for client-side behavior in Next.js 15

import Image from "next/image";
import SignUpcard from "./SignUpcard";

const TopBannerSearch = ({ backgroundimage, vendors }) => {
  return (
    <>
      <div className="top_banner">
        <div
          className="top_banner_content relative h-[38vh] sm:h-[45vh] md:h-[62vh] lg:h-[75vh] xl:h-[75vh] bg-cover bg-no-repeat
            before:content-[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0
            before:bg-[#0000007d] before:h-[38vh] sm:before:h-[45vh] md:before:h-[62vh] lg:before:h-[75vh] xl:before:h-[75vh] bg:opacity-25"
        >
          <Image
            src={backgroundimage}
            alt="Product screenshot"
            className="mx-auto max-w-none h-[38vh] sm:h-[45vh] md:h-[62vh] lg:h-[75vh] xl:h-[75vh] w-full object-cover object-top"
            width={100}
            height={100}
          />
          <SignUpcard title="Featured Suppliers" vendors={vendors} />
        </div>
      </div>
    </>
  );
};

export default TopBannerSearch;
