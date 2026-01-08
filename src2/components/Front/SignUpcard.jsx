"use client";

import BannerSectionCard from "./BannerSectionCard";
import { useEffect, useState, useRef } from "react";
import { getVendors } from "@/app/lib/server-api";
import { useAuth } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";

const SignUpcard = () => {
  const { loading } = useAuth();
  const searchParams = useSearchParams();
  const hasFetchedRef = useRef(false);

  // Query Params
  const state_id = searchParams.get("state") || "";
  const city = searchParams.get("city") || "";
  const stateName = searchParams.get("stateName") || "";

  // States
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
  if (!vendorCount || vendorCount === 0) return null;

  return (
    <div className="image_grid absolute z-40 left-0 right-0 top-[2rem] md:top-[3rem] lg:top-[4rem] xl:top-[5rem] 2xl:top-[3rem] md:px-16 lg:px-16 xl:px-24 px-5">
      <div className="rounded-xl overflow-hidden shadow-xl flex flex-col bg-white">
        <div className="flex items-center p-3 bg-[#B13634]" />
        <div className="text-center py-3 sm:py-3 md:py-4 lg:py-6">
          <h2 className="lg:text-2xl text-xl font-bold tracking-tight text-[#171717]">
            Featured Suppliers
          </h2>
        </div>

        {vendors && <BannerSectionCard vendors={vendors} />}
      </div>
    </div>
  );
};

export default SignUpcard;
