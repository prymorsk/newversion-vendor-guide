"use client";

import DetailsCarosuel from "@/components/Front/DetailsCarosuel";
import DetailsHero from "@/components/Front/DetailsHero";
import DetailsRight from "@/components/Front/DetailsRight";
import { useState, useEffect, useRef } from "react";
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/UserContext";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SearchPage = ({ slug, bannerContent }) => {
  const vendorId = slug;
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState({});

const [tab, setTab] = useState("");

useEffect(() => {
  if (filterData?.multi_family) {
    setTab("multi");
  } else if (filterData?.commercial) {
    setTab("comm");
  } else if (filterData?.residential) {
    setTab("resi");
  }
}, [filterData]);




  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  /** 🔒 guards */
  const urlSyncedRef = useRef(false);
  const dataFetchedRef = useRef(false);

  /**
   * ✅ Sync URL ONCE (no infinite loop)
   */
  useEffect(() => {
    if (urlSyncedRef.current) return;

    const params = searchParams.toString();
    const updatedPath = params ? `${pathname}?${params}` : pathname;

    router.replace(updatedPath, { scroll: false });
    urlSyncedRef.current = true;
  }, [searchParams, pathname, router]);

  /**
   * ✅ Fetch vendor data ONLY ONCE per vendorId
   */
  useEffect(() => {
    if (!vendorId || dataFetchedRef.current) return;

    dataFetchedRef.current = true;

    const fetchData = async () => {
      try {
        const token = getCookie("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}vendor/${vendorId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch vendor data");

        const dataProp = await response.json();
         //console.log('filterData details');
        // console.log(dataProp);

        setFilterData(dataProp?.data || {});
      } catch (error) {
        console.error("Vendor fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vendorId]);
  
const cleanHtmlMul = filterData?.multi_family_description
?.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "");
const cleanHtmlCom = filterData?.commercial_description
?.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "");
const cleanHtmlRes = filterData?.residential_description
?.replace(/<p>(?:\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "");

  return (
    <>
    <DetailsHero
            filterData={filterData}
            backgroundImage={bannerContent}
          />

          <section className="innerpage-wapper-sections">
          <div className="container mx-auto">

      {isLoading ? (
        <div className="container mx-auto pt-12 flex justify-center">
          <div className="loading-wave flex gap-1">
            <div className="loading-bar bg-[#c1272d]" />
            <div className="loading-bar bg-[#c1272d]" />
            <div className="loading-bar bg-[#c1272d]" />
          </div>
        </div>
      ) : (
        <>
          
              <div className="infobox-details bg-white rounded-3xl p-8 flex flex-col lg:flex-row gap-10">
                <div className="lg:w-[40%]  rounded-2xl ">
                  <DetailsCarosuel filterData={filterData} />
                </div>

                <div className="lg:w-[60%]">
                  <DetailsRight filterData={filterData} user={user} />
                </div>
              </div>

              {/* Tabs */}
              <div className="details-tabsection mt-10">
                <div className="flex gap-4 mb-6">

                    {!!filterData?.multi_family &&  cleanHtmlMul?.trim()?.length > 0 && (
                    <button
                    onClick={() => setTab("multi")}
                    className={`px-6 py-2 rounded-full font-semibold ${
                    tab === "multi" ? "bg-[#B13634] text-white" : "bg-black text-white"
                    }`}
                    >
                    Multifamily Description
                    </button>
                    )}

                    {!!filterData?.commercial &&  cleanHtmlCom?.trim()?.length > 0 && (
                    <button
                    onClick={() => setTab("comm")}
                    className={`px-6 py-2 rounded-full font-semibold ${
                    tab === "comm" ? "bg-[#B13634] text-white" : "bg-black text-white"
                    }`}
                    >
                    Commercial Description
                    </button>
                    )}

                    {!!filterData?.residential &&  cleanHtmlRes?.trim()?.length > 0 && (
                    <button
                    onClick={() => setTab("resi")}
                    className={`px-6 py-2 rounded-full font-semibold ${
                    tab === "resi" ? "bg-[#B13634] text-white" : "bg-black text-white"
                    }`}
                    >
                    Residential Description
                    </button>
                    )}

                          



                </div>

               <div className="bg-white border rounded-3xl p-8 customformat prose">
                  {!!filterData?.multi_family && tab === "multi" &&  cleanHtmlMul?.trim()?.length > 0 && (
                   
                  <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                  __html: cleanHtmlMul || "NA",
                  }}
                  />

                  )}

                {!!filterData?.commercial && tab === "comm" &&  cleanHtmlCom?.trim()?.length > 0 && (
                 
                <div
                className="prose"
                dangerouslySetInnerHTML={{
                __html: cleanHtmlCom || "NA",
                }}
                />


                  )}

                {!!filterData?.residential && tab === "resi" &&  cleanHtmlRes?.trim()?.length > 0 && (
                 
                <div
                className="prose"
                dangerouslySetInnerHTML={{
                __html: cleanHtmlRes || "NA",
                }}
                />


                  )}
                </div>
              </div>
            
        </>
      )}

      </div>
      </section>
    </>
  );
};

export default SearchPage;
