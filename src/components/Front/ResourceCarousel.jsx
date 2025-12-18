"use client";
import Image from "next/image";
import React, { Component } from 'react';
import SearchBar from "@/components/Front/SearchBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Link from "next/link";

const ResourceCarousel = ({rowData}) => {

  // console.log(rowData);
  return (

    <Carousel  showIndicators={false} showThumbs={false} >
       {rowData.map((row, i) => (
      <div  key={i}>
      <div className="sm:mt-0 sm:px-7 xl:px-9">
        <Image
          src={row.image_url}
          className="w-full  h-[100%] xl:h-[100%] object-fill"
          alt="Vendor Guide Logo"
          width="100"
          height="100"
        />
      </div>
      <div className="text-center block">
        <Link
          href=""
          className="my-4 xl:my-9 mx-5 xl:mx-8  block px-0  py-1 lg:py-2 text-center rounded-full  bg-[#221F20] xl:text-xl text:lg tracking-wide font-medium font-lato text-white shadow-sm hover:bg-[#221F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20]"
        >
          {row.title}
        </Link>
        <p className="xl:text-xl text-lg font-bold text-[#171717b]">
          {row.short_description}
        </p>
        <h2 className="xl:text-xl text-lg font-bold text-[#171717b]">
          {row.title2}
        </h2>
      </div>
    </div>
))}
    </Carousel>
    
  );
}

export default ResourceCarousel;