"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import BannerSectionCard from "./BannerSectionCard";
import { getVendors } from "@/app/lib/server-api";
import { useAuth } from "@/context/UserContext";

const SignUpcardNew = ({ backgroundimage }) => {
  const { loading } = useAuth();
  const searchParams = useSearchParams();
  const hasFetchedRef = useRef(false);

  // Query Params
  const state_id = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";
  const stateName = searchParams.get("stateName") || "";

  // State
  const [vendors, setVendors] = useState(null);
  const [vendorCount, setVendorCount] = useState(0);
  const [geoError, setGeoError] = useState(null);

  // =============================
  // Fetch Featured Vendors
  // =============================
  const fetchVendors = async (lat, long) => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    try {
      const result = await getVendors({
        latitude: lat,
        longitude: long,
        state_id,
        city,
        stateName,
      });

      if (result?.count > 0) {
        setVendorCount(result.count);
        setVendors(result);
      }
    } catch (error) {
      console.error("Vendor Fetch Error:", error);
    }
  };

  // =============================
  // Geolocation Logic (Run Once)
  // =============================
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported");
      fetchVendors(0, 0);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchVendors(latitude, longitude);
      },
      () => {
        setGeoError("Unable to fetch location");
        fetchVendors(0, 0);
      },
      {
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 60000,
      }
    );
  }, []);

  // =============================
  // Render
  // =============================
  if (!vendorCount) 

return (
  <section
    id="hero_section"
    className="inner hero-section commonpage"
    style={{
      backgroundImage: backgroundimage ? `url(${backgroundimage})` : "none",
    }}
  ></section>
);



  return (

    <div className="top_banner ">
      <div
        className="top_banner_content relative h-[38vh] sm:h-[45vh] md:h-[62vh] lg:h-[85vh] xl:h-[85vh] bg-cover bg-no-repeat
        before:content-[''] before:absolute before:inset-0 before:bg-[#0000007d]"
      >
        <Image
          src={backgroundimage}
          alt="Featured suppliers banner"
          className="mx-auto max-w-none h-full w-full object-cover object-top"
          width={100}
          height={100}
          priority
        />

        <div className="image_grid absolute z-40 left-0 right-0 top-[2rem] md:top-[3rem] lg:top-[4rem] xl:top-[5rem] md:px-16 lg:px-16 xl:px-24 px-5 mt-4">
          <div className="rounded-xl overflow-hidden shadow-xl flex flex-col bg-white">
            <div className="flex items-center p-3 bg-[#B13634]" />

            <div className="text-center py-3 md:py-4 lg:py-6">
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-[#171717]">
                Featured Suppliers
              </h2>
            </div>

            {vendors && <BannerSectionCard vendors={vendors} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpcardNew;
