"use client";
import Image from "next/image";
import React, { Component } from 'react';
import SearchBar from "@/components/Front/SearchBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Carouselbanner = (props) => {
  return (
    <Carousel  showIndicators={true} showThumbs={false} >
      <div>
        <Image
          src="/images&icons/banner1.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
          width="100" height="1000"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <SearchBar
            title="Find the perfect vendor for the job."
            btnTitle="Search"
          />
        </div>
      </div>
      <div>
        <Image
          src="/images&icons/banner1.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
          width="100" height="1000"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <SearchBar
            title="Find the perfect vendor for the job."
            btnTitle="Search"
          />
        </div>
      </div>
      <div>
        <Image
          src="/images&icons/banner1.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
          width="100" height="1000"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
          <SearchBar
            title="Find the perfect vendor for the job."
            btnTitle="Search"
          />
        </div>
      </div>
    </Carousel>
  );
}

export default Carouselbanner;