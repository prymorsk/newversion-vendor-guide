"use client";

import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const DetailsCarosuel = ({ filterData }) => {
  const vendoreimgedit = filterData?.vendoreimgedit || [];

  const extractedData = vendoreimgedit.map((item) => ({
    image_url: item.vendorimageview.image_url,
    alt_tag: item.vendorimageview.alt_tag,
  }));

  // 👉 CONTROL SLIDE INDEX
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = extractedData.length;

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full  imgdetailcusdmain">

      {/* LEFT ARROW */}
      {totalSlides > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#B13634] text-white w-10 h-10 rounded-full flex items-center justify-center z-20"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
      )}

      {totalSlides > 0 ? (
        <Carousel
          selectedItem={currentSlide}      // ✅ controlled
          onChange={(index) => setCurrentSlide(index)}
          showIndicators={true}
          showStatus={false}
          showThumbs={false}
          swipeable
          emulateTouch
        >
          {extractedData.map((item, index) => (
            <div key={index} className=" imgdetailcusd" >
              <Image
                src={item.image_url}
                alt={`Image of ${item.alt_tag}`}
                className=" w-full object-cover imgdetailcusdimg"
                width={572}
                height={500}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="imgdetailcusd flex items-center justify-center">
          <Image
            src="/images&icons/search_result/planetmedia.jpeg"
            alt="Default Image"
            className=" w-full object-cover imgdetailcusdimg"
            width={100}
            height={100}
          />
        </div>
      )}

      {/* RIGHT ARROW */}
      {totalSlides > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#B13634] text-white w-10 h-10 rounded-full flex items-center justify-center z-20"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      )}
    </div>
  );
};

export default DetailsCarosuel;
