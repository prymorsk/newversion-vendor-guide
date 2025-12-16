"use client";

import DetailsCarosuel from "@/components/Front/DetailsCarosuel";
import DetailsHero from "@/components/Front/DetailsHero";
import DetailsRight from "@/components/Front/DetailsRight";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/UserContext";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const SearchPage = ({ slug, bannerContent }) => {
  const vendorId = slug;
  const [isLoading, setIsLoading] = useState(true);
  const [filterData, setFilterData] = useState({});
  const { user } = useAuth();


  const [tab, setTab] = useState("multi");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(updatedPath);
  }, [searchParams, pathname, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie("token");
        const response = await fetch(`${process.env.BASE_API_URL}vendor/${vendorId}`, {
          method: "GET",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch vendor data");

        const dataProp = await response.json();
        setFilterData(dataProp.data || {});
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vendorId]);

  return (
    <>
      {isLoading ? (
        <div className="container mx-auto overflow-hidden pt-5 md:pt-12 px-5 md:px-8 xl:px-24">
          <div className="w-full flex justify-center py-6">
            <div className="loading-wave flex gap-1 min-h-[80px] items-center">
              <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave"></div>
              <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave delay-100"></div>
              <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave delay-200"></div>
              <div className="loading-bar bg-[#c1272d] rounded-[5px] w-2 h-6 animate-wave delay-300"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <DetailsHero filterData={filterData} backgroundImage={bannerContent} />

          <section className="innerpage-wapper-sections">
            <div className="container mx-auto">
              <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 flex flex-col lg:flex-row gap-10">
                {/* Left */}
                <div className="w-full lg:w-[40%] relative border rounded-2xl p-6 flex items-center justify-center min-h-[550px]">
                  <DetailsCarosuel filterData={filterData} />
                </div>

                {/* Right */}
                <div className="w-full lg:w-[60%]">
                  <DetailsRight filterData={filterData} user={user} />
                </div>


              </div>



{/*bottom tab*/}


    <div className="details-tabsection">
      <div className="w-full mx-auto mt-10">

        {/* TABS */}
        <div className="flex gap-4 mb-6">

          {/* Multifamily */}
          <button
            onClick={() => setTab("multi")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              tab === "multi"
                ? "bg-[#B13634] text-white"
                : "bg-black text-white"
            }`}
          >
            Multifamily Description
          </button>

          {/* Commercial */}
          <button
            onClick={() => setTab("comm")}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              tab === "comm"
                ? "bg-[#B13634] text-white"
                : "bg-black text-white"
            }`}
          >
            Commercial Description
          </button>


{filterData?.residential !== 0 &&
 filterData?.residential_description !== null && (
  <button
    onClick={() => setTab("resi")}
    className={`px-6 py-2 rounded-full font-semibold transition ${
      tab === "resi"
        ? "bg-[#B13634] text-white"
        : "bg-black text-white"
    }`}
  >
    Residential Description
  </button>
)}


        </div>

        {/* CONTENT BOX */}
        <div className="bg-white border rounded-3xl p-8 leading-relaxed text-gray-800">

          {/* MULTIFAMILY CONTENT */}
          {tab === "multi" && (
            <div>
           
              {isLoading ? (
              // <div className="my-10 text-center text-gray-500">Loading...</div>
              <LoadingComponents/>
              ) : (
              (filterData?.multi_family !== 0 && filterData?.multi_family_description!="") ? (

              <div className="text-[#647589] text-lg font-medium font-lato leading-8" dangerouslySetInnerHTML={{ __html: filterData?.multi_family_description }} />


              ) : (
              <p></p>

              )
              )}


            </div>
          )}

          {/* COMMERCIAL CONTENT */}
          {tab === "comm" && (
            <div>
                {/* commerciel data */}
             {isLoading ? (
                    // <div className="my-10 text-center text-gray-500">Loading...</div>
                    <LoadingComponents/>
                  ) : (
                    (filterData?.commercial !== 0 && filterData?.commercial_description!=null) ? (
                      
                        <div  className="text-[#647589] text-lg font-medium font-lato leading-8" dangerouslySetInnerHTML={{ __html: filterData?.commercial_description }} />
                         
                        
                     
                    ) : (
                      <p></p>
                      
                    )
                  )}
                {/* residential data */}
            </div>
          )}


{/* COMMERCIAL CONTENT */}
          {tab === "resi" && (
            <div>
                {/* commerciel data */}
             {isLoading ? (
                    // <div className="my-10 text-center text-gray-500">Loading...</div>
                    <LoadingComponents/>
                  ) : (
                    (filterData?.residential !== 0 && filterData?.residential_description!=null) ? (
                      
                        <div  className="text-[#647589] text-lg font-medium font-lato leading-8" dangerouslySetInnerHTML={{ __html: filterData?.residential_description }} />
                         
                        
                     
                    ) : (
                      <p></p>
                      
                    )
                  )}
                {/* residential data */}
            </div>
          )}




        </div>
      </div>
    </div>

{/*bottom tab end*/}




            </div>
          </section>
        </>
      )}
    </>
  );
};

export default SearchPage;
