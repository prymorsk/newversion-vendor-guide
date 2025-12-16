"use client";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/UserContext";


const ContentPageAboutWord = ({blogs}) => {
const {user,isLoding,isInfoLoding,logout}  = useAuth();


  return (
    <>
      <div className="mx-auto xl:px-20 px-6">
            <div className="mt-12">
              <p className="text-black text-lg font-medium leading-8">
                  At VendorGuideOnline.com we understand the unique challenges of managing multi-family properties. Our extensive directory features verified vendors offering apartment painting, multi-family roofing, and apartment renovation services, just to name a few. From property restoration and apartment cleaning to expert plumbers for multifamily units, find all the resources you need to maintain and enhance your apartment properties. Need promotional products or advertising? Apartment turns or junk removal? We have over 90 categories of service offerings to search, review, and even send bid requests. Join our community of property managers and apartment managers who trust VendorGuideOnline.com for all their service provider needs. Experience seamless vendor search and selection with VendorGuideOnline.com, your go-to platform for apartment and multi-family property services.
              </p>
             
           
        </div>
      </div>
    </>
  );
};

export default ContentPageAboutWord;
