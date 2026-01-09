"use client";

import VendorCard from "@/components/Front/VendorCard";
import { useAuth } from "@/context/UserContext";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchAllData = ({ states }) => {
  const { user } = useAuth();
  const [geoLatitude, setGeoLatitude] = useState(0);
  const [geoLongitude, setGeoLongitude] = useState(0);
  const [postalCode, setPostalCode] = useState("");
  const [locality, setLocality] = useState("");
  const [isLoading, setIsLoding] = useState(false);
  const [defaultinputvalue, setDefaultinputvalue] = useState();

  const searchParams = useSearchParams();
  const search = searchParams.get("key_word") ? searchParams.get("key_word") : "";

  // Helper to fetch location from Google Maps API
  const fetchLocationData = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=postal_code&key=${process.env.NEXT_PUBLIC_NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
      );

      if (res.status === 429) {
        console.warn("Rate limit exceeded. Retry after some time.");
        return;
      }
      if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
      }

      const resLoc = await res.json();

      if (resLoc.results && resLoc.results.length > 0) {
        const addressComponents = resLoc.results[0].address_components;
        setDefaultinputvalue(
          addressComponents
            ? `${addressComponents[1].long_name}, ${addressComponents[2].long_name} ${addressComponents[0].long_name}, ${addressComponents[3].long_name}`
            : ""
        );

        let postalCode2;
        let state;

        for (const component of addressComponents) {
          if (component.types.includes("postal_code")) postalCode2 = component.short_name;
          if (component.types.includes("locality")) state = component.long_name;
          if (postalCode2 && state) break;
        }

        setLocality(state);
        setPostalCode(postalCode2);
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    } finally {
      setIsLoding(false);
    }
  };

  useEffect(() => {
    if (getCookie("token") || user) {
      // If user is logged in, use user data
      setGeoLatitude(user?.latitude);
      setGeoLongitude(user?.longitude);
      setPostalCode(user?.postal_code);
      setLocality(user?.city);
      setIsLoding(false);
    } else {
      // Get geolocation
      if (typeof window !== "undefined" && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude, longitude } = coords;
          setGeoLatitude(latitude);
          setGeoLongitude(longitude);
          fetchLocationData(latitude, longitude); // Call API once coordinates are ready
        });
      } else {
        setIsLoding(false); // fallback if geolocation not available
      }
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="search-section bg-[#f7f9f8]">
            <div className="isolate px-6 lg:px-8">
              <div className="mx-auto max-w-2xl py-5 lg:py-12 md:pt-10 lg:pt-8">
                <div className="text-center">
                  <h1 className="xl:text-5xl lg:text-4xl text-3xl font-bold tracking-tight text-[#221F20] md:text-4xl">
                    Search Results
                  </h1>
                  <p className="lg:mt-2 mt-3 lg:text-xl text-sm leading-3 text-[#221F20] font-semibold">
                    {locality ? `${search} in ${locality}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact_search bg-[#f7f9f8]">
            <div className="py-20 pt-8 px-10 md:px-10">
              <div className="grid grid-cols-12 md:gap-12">
                <div className="col-span-12 md:col-span-12 lg:col-span-12 order-2 sm:order-1">
                  <div className="loading-screen text-center">
                    <p className="text-[#221F20] font-bold text-md">
                      Please wait, we are finding the best Vendors for your project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (

      <section className="innerpage-wapper-sections">
<div className="container mx-auto">
<div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8  flex-col lg:flex-row gap-10 bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800 innersearch">

<h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold    font-lato lg:px-10" >   Search Results</h1>
      
                      
        <VendorCard
          val={defaultinputvalue}
          lat={geoLatitude}
          long={geoLongitude}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          locality={locality}
          setLocality={setLocality}
          states={states}
        />

        
                </div>
              </div>
           </section>
      )}
    </>
  );
};

export default SearchAllData;
