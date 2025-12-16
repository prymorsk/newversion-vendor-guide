"use client";

import { useState } from "react";
import Image from "next/image";

const DetailsSlider = ({ filterData }) => {
  const vendoreimgedit = filterData?.vendoreimgedit || [];

  const extractedData = vendoreimgedit
    .filter(item => item?.vendorimageview)
    .map(item => ({
      image_url: item.vendorimageview.image_url || "/images&icons/search_result/planetmedia.jpeg",
      alt_tag: item.vendorimageview.alt_tag || "Vendor Image",
    }));

  const [slide, setSlide] = useState(0);

  const prevSlide = () => {
    setSlide(slide === 0 ? extractedData.length - 1 : slide - 1);
  };

  const nextSlide = () => {
    setSlide(slide === extractedData.length - 1 ? 0 : slide + 1);
  };

  return (
    <div className="w-full lg:w-[40%] relative border rounded-2xl p-6 flex items-center justify-center min-h-[550px]">
      {/* Left Arrow */}
      {extractedData.length > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#B13634] text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
        >
          ←
        </button>
      )}

      {/* Images */}
      {extractedData.length > 0 ? (
        extractedData.map((item, index) => (
          <div
            key={index}
            style={{ display: slide === index ? "block" : "none" }}
            className="absolute w-full flex justify-center"
          >
            <Image
              src={item.image_url}
              alt={item.alt_tag}
              className="w-3/4 lg:w-full max-h-[500px] object-contain"
              width={500}
              height={500}
            />
          </div>
        ))
      ) : (
        <div className="absolute w-full flex justify-center">
          <Image
            src="/images&icons/search_result/planetmedia.jpeg"
            alt="Default Image"
            className="w-3/4 lg:w-full max-h-[500px] object-contain"
            width={500}
            height={500}
          />
        </div>
      )}

      {/* Right Arrow */}
      {extractedData.length > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#B13634] text-white w-10 h-10 rounded-full flex items-center justify-center z-10"
        >
          →
        </button>
      )}
    </div>
  );
};

export default DetailsSlider;
