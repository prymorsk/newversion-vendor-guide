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
  const [tab, setTab] = useState("multi");

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
         console.log('filterData details');
         console.log(dataProp);

        setFilterData(dataProp?.data || {});
      } catch (error) {
        console.error("Vendor fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vendorId]);

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
                <div className="lg:w-[40%] border rounded-2xl p-6">
                  <DetailsCarosuel filterData={filterData} />
                </div>

                <div className="lg:w-[60%]">
                  <DetailsRight filterData={filterData} user={user} />
                </div>
              </div>

              {/* Tabs */}
              <div className="details-tabsection mt-10">
                <div className="flex gap-4 mb-6">
                      {["multi", "comm", "resi"].map((t) => (
                      (t !== "resi" ||
                      Boolean(filterData?.residential_description)) && (
                      <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-6 py-2 rounded-full font-semibold ${
                      tab === t
                      ? "bg-[#B13634] text-white"
                      : "bg-black text-white"
                      }`}
                      >
                      {t === "multi"
                      ? "Multifamily"
                      : t === "comm"
                      ? "Commercial"
                      : "Residential"}{" "}
                      Description
                      </button>
                      )
                      ))}

                </div>

                <div className="bg-white border rounded-3xl p-8">
                  {tab === "multi" && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: filterData?.multi_family_description || "NA",
                      }}
                    />
                  )}

                  {tab === "comm" && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: filterData?.commercial_description || "NA",
                      }}
                    />
                  )}

                  {tab === "resi" && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: filterData?.residential_description || "NA",
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
