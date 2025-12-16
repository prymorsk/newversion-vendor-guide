"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import Link from "next/link";
import LoadingComponents from "../LoadingComponents";
import { useAuth } from "@/context/UserContext";

const BannerSectionCard = (props) => {
  const {loading} = useAuth();

console.log('vendors chekinggggg');
console.log(props.vendors);

  
  return (
  
    <div>
	
    <div className="flex items-center justify-center gap-2 md:gap-5 sm:mt-4 px-4 md:px-8 lg:my-4 my-2">
	
{loading?(
  <LoadingComponents/>
)
:(
<>
  {props.vendors?.data && props.vendors?.data.map((row, i) => {
    return (
      <div
        key={i}
        className=" lg:col-span-1  shadow-sm border border-gray-300 bg-gray-200 h-full w-1/5"
      >
        <div className="sm:mt-0 flex justify-center md:justify-end h-full items-center p-1">
          <Link href={`/vendors/`+ row.slug }>
          <Image
            src={row.image_url?row.image_url:""}
            alt={row.name?row.name:""}
            className="w-full w-auto"
            width="100"
            height="100"
          />
          </Link>
        </div>
      </div>
    );
  })}

</>
)  
}
    </div> </div>
  );
};

export default BannerSectionCard;
