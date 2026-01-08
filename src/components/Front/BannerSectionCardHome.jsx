"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getVendors } from "@/app/lib/server-api";
import LoadingComponents from "../LoadingComponents";
import { useAuth } from "@/context/UserContext";

const CACHE_KEY_COORDS = "user_coords";
const CACHE_KEY_VENDORS = "vendors_data";
const CACHE_EXPIRY_MS = 1 * 60 * 1000; // 2 minutes

const BannerSectionCardHome = () => {

  //console.log('checking');
  const { loading } = useAuth();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [vendors, setVendors] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetched = useRef(false);

  /* -----------------------------------------
     1. Load Vendor Cache Immediately (Fastest)
  ------------------------------------------ */
  useEffect(() => {
    const cachedVendorsStr = localStorage.getItem(CACHE_KEY_VENDORS);

    if (cachedVendorsStr) {
      const cached = JSON.parse(cachedVendorsStr);
      const now = Date.now();

      if (now - cached.timestamp < CACHE_EXPIRY_MS) {
        //console.log("Using c vendors — skipping location entirely");
        setVendors(cached.data);
        setIsFetching(false);
        return; // EXIT → no need for coordinates
      }
    }

    // No vendor cache → load coordinates
    loadCoordinates();
  }, []);

  /* -----------------------------------------
     2. Try IP LOCATION FIRST (Fast)
  ------------------------------------------ */
  async function loadCoordinates() {
    setIsFetching(true);

    // Try cached coords first
    const cachedCoordsStr = localStorage.getItem(CACHE_KEY_COORDS);
    if (cachedCoordsStr) {
      const cached = JSON.parse(cachedCoordsStr);
      const now = Date.now();

      if (now - cached.timestamp < CACHE_EXPIRY_MS) {
        //console.log("Using c coords");
        setLatitude(cached.lat);
        setLongitude(cached.lng);

        //setLatitude('45.0949961');
        //setLongitude('-93.24372989999999');

    

        return;
      }
    }

    // Try IP-based location first (fast)
    const ipLoc = await getIPLocation();
    if (ipLoc) {
      //console.log("Using IP "+ipLoc.latitude+"-"+ipLoc.longitude);
        //setLatitude('45.0949961');
        //setLongitude('-93.24372989999999');
      setLatitude(ipLoc.latitude);
      setLongitude(ipLoc.longitude);

      localStorage.setItem(
        CACHE_KEY_COORDS,
        JSON.stringify({ ...ipLoc, timestamp: Date.now() })
      );

      return;
    }

    // If IP failed → use GPS as backup
    //console.log("IP failed → trying GPS");
    tryGPSLocation();
  }

  /* -----------------------------------------
     3. IP API → geolocation-db.com
  ------------------------------------------ */
  async function getIPLocation() {
    try {
      const res = await fetch("https://geolocation-db.com/json/");
      const json = await res.json();

      if (json.latitude && json.longitude) {
        return {
          latitude: json.latitude,
          longitude: json.longitude,
        };
      }
      return null;
    } catch (e) {
      //console.warn("IP API failed:", e);
      return null;
    }
  }

  /* -----------------------------------------
     4. GPS fallback if IP fails
  ------------------------------------------ */
  function tryGPSLocation() {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        //console.log("GPS success");


        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

       // console.log("GPS IP "+lat+"-"+lng);


        localStorage.setItem(
          CACHE_KEY_COORDS,
          JSON.stringify({ lat, lng, timestamp: Date.now() })
        );
      },
      (err) => {
        console.warn("GPS failed too:", err);
        setIsFetching(false);
      },
      { timeout: 3000 }
    );
  }

  /* -----------------------------------------
     5. Fetch vendors after coordinates found
  ------------------------------------------ */
  useEffect(() => {
    if (!latitude || !longitude) return;
    if (fetched.current) return;

    fetched.current = true;

    const fetchVendorsData = async () => {
      try {
        //console.log("Fetching vendors from API...");
        const data = await getVendors({ latitude, longitude });
        setVendors(data || null);

        localStorage.setItem(
          CACHE_KEY_VENDORS,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      } catch (err) {
        console.error("Vendor API error:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchVendorsData();
  }, [latitude, longitude]);

  const showLoader = loading || isFetching;

  /* -----------------------------------------
     6. UI Rendering
  ------------------------------------------ */

  //console.log('vendors.data');
  //console.log(vendors);
  //console.log('vendors.data');
  
  return (
    <div className="container mt-15 mx-auto row-featured-suppliers">

      {vendors?.count > 0 && (
        <h3 className="text-center mb-10 mt-5 text-[#fff]">Featured Suppliers</h3>
      )}

    <div className="featuredsuppliers-listing">
    <div className="flex flex-wrap justify-center gap-4">
      

        {showLoader ? (
          <div className="w-full flex justify-center py-6">
            <div className="loading-wave flex gap-1">
                <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave"></div>
                <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave delay-100"></div>
                <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave delay-200"></div>
                <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave delay-300"></div>
            </div>
        </div>
        ) : vendors?.data?.length > 0 ? (
          vendors.data.map((row, i) => (


          <div  key={i}

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



            
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
    </div>
  );
};

export default BannerSectionCardHome;
