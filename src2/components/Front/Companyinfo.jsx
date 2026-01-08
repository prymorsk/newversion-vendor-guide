"use client"; 
import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { Label } from "reactstrap";
import { getResponse } from "@/app/lib/load-api";
import { getCookie } from "cookies-next";
import AddressAutocomplete from "./AddressAutocompleteFront";

const Companyinfo = (props) => {

  const Router = useRouter();
  const Pathname = usePathname();
  const searchParams = useSearchParams();

  const [urlString,setUrlString] = useState("");
  const [searchCategoryvalue, setSearchCategoryvalue] = useState(props.categoryInput || "");
  const [SearchStatevalue, setSearchStatevalue] = useState(props.stateInput || "");
  const [Searchkeywordvalue, setSearchkeywordvalue] = useState(props.key_word || "");
  const [city, setSearchCity] = useState(props.city || "");
  const [stateName, setstateName] = useState(props.stateName || "");
  const [cityData, setcityData] = useState(props.cityData || []);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isLoading, setIsLoding] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchCategoryvalue && !SearchStatevalue && !Searchkeywordvalue) {
      alert("Please select state or category or company name.");
      return false;
    }

    props.setIsLoding(true);
    props.bannerResponse();
  };

  async function onStatChange(event) {
    const stateIdval = event.target.value || "";
    const stateNameval =
      event.target.selectedOptions[0].dataset.name || "";

    props.setStateInput(stateIdval);
    setSearchStatevalue(stateIdval);
    setstateName(stateNameval);
    props.setstateName(stateNameval);

    fetchDataCity(stateNameval);

    setSearchCity("");
    props.setCityInput("");
  }

  async function onCityChange(event) {
    props.setCityInput(event.target.value);
    setSearchCity(event.target.value);
  }

  async function onCategoryChange(event) {
    props.setCategoryInput(event.target.value);
    setSearchCategoryvalue(event.target.value);
  }

  async function onKeywordChange(event) {
    props.setsearchWord(event.target.value);
    setSearchkeywordvalue(event.target.value);
  }

  const fetchDataCity = async (stateName) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}get-market-city?state_name=${stateName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      if (!response.ok) {
        setIsLoding(false);
        throw new Error("Failed to fetch city data. Please try again.");
      }

      const cityResult = await response.json();
      setcityData(cityResult);
      props.setcityData(cityResult);
      setIsLoding(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoding(false);
    } finally {
      setIsFetchingData(false);
    }
  };

  return (
    <>
        <div className="isolate px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-5 lg:py-12 md:pt-10 lg:pt-8">
            <div className="text-center">
              

              <p className="d-block lg:mt-2 mt-3 lg:text-xl text-sm leading-3 text-[#221F20] font-semibold hidden">
                {props.searchWord &&
                  (props.locality
                    ? `${props.searchWord} near ${props.locality}`
                    : props.searchWord)}
              </p>
            </div>
          </div>
        </div>

        <div className="text-sm text-center hidden">
          Latitude: {props.latitude}, Longitude: {props.longitude}
        </div>

        <div className="md:block justify-center px-10 sm:px-20 md:px-28 lg:px-8 xl:px-12 text-sm items-center">
          <div className="lg:flex xl:text-sm text-xs items-center justify-center">

            {/* Advanced Search Header */}
            <div className="px-4 py-3 bg-black w-[10rem] lg:w-[290px] mx-auto lg:mx-0 mb-4 lg:mb-0 lg:mr-[30px] hidden">
              <p className="font-bold text-white text-center">Advanced Search</p>
            </div>

            <div className="px-4 py-6 lg:py-3 rounded-xl lg:rounded-none justify-between">
              <form
                className="lg:flex justify-center items-center gap-5 text-sm lg:pr-[0.1rem] xl:pr-[1.1rem] pr-4"
                onSubmit={handleSearch}
              >
                <div className="main lg:flex lg:items-center lg:justify-center">






                
                  
                  {/* States */}
                  <div className="grid xl:grid-cols-12 lg:mx-4 items-center lg:pl-0 lg:mb-0 mb-3 company_search">
                    <div className="col-span-12 text-left mb-1">
                      <label className="font-bold xl:text-sm lg:text-sm text-base text-[#221F20]">
                        States
                      </label>
                    </div>

                    <div className="col-span-12 mt-3">
                      <select
                        className="xl:col-span-12 w-full h-[34px] border-gray-300 lg:w-[10rem] placeholder:text-sm border-solid rounded border-[1px] pl-2"
                        value={props.stateInput}
                        onChange={onStatChange}
                      >
                        <option value="">Select State</option>
                        {props.states?.data?.map((row, i) => (
                          <option data-name={row.name} key={i} value={row.id}>
                            {row.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>



<div className="grid xl:grid-cols-12 lg:mx-4 items-center mb-3 company_search">
                    <div className="col-span-12 mb-1">
                      <label className="font-bold xl:text-sm lg:text-sm text-base text-[#221F20]">
                        Category
                      </label>
                    </div>

                    <div className="col-span-12 mt-3">
                      <select
                        className="w-full h-[34px] border-gray-300 lg:w-[10rem] placeholder:text-sm border-solid rounded border-[1px] pl-2"
                        value={props.categoryInput}
                        onChange={onCategoryChange}
                      >
                        <option value="">Select Category</option>
                        {props.categoryData?.data?.map((row, i) => (
                          <option key={i} value={row.id}>
                            {row.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>



                  

                  {/* City */}
                  <div className="grid xl:grid-cols-12 lg:mx-4 items-center mb-3 company_search">
                    <div className="col-span-12 mb-1">
                      <label className="font-bold xl:text-sm lg:text-sm text-base text-[#221F20]">
                        City
                      </label>
                    </div>

                    <div className="col-span-12 mt-3">
                      <select
                        className="xl:col-span-12 w-full h-[34px] border-gray-300 lg:w-[10rem] placeholder:text-sm border-solid rounded border-[1px] pl-2"
                        value={city}
                        onChange={onCityChange}
                      >
                        <option value="">Select City</option>
                        {props.cityData?.data?.map((row, i) => (
                          <option key={i} value={row.market_city}>
                            {row.market_city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

   

               

                  {/* Area / Address Autocomplete */}
                  <div className="grid xl:grid-cols-12 mb-5 company_search lg:pt-4 hidden">
                    <div className="col-span-12 mb-1">
                      <label className="font-bold xl:text-sm lg:text-sm text-base text-[#221F20]">
                        Area
                      </label>
                    </div>

                    <div className="col-span-12 mt-3 items-center">
                      <AddressAutocomplete
                        val={props.val}
                        setGeoLatitude={props.setGeoLatitude}
                        setGeoLongitude={props.setGeoLongitude}
                        setStateInput={props.setStateInput}
                        setPostalCode={props.setPostalCode}
                        bannerResponse={props.bannerResponse}
                        setLocality={props.setLocality}
                      />
                    </div>
                  </div>
                </div>

  {/* Category */}
                  
{/* Search Company */}
                  <div className="grid xl:grid-cols-12 mb-3 company_search">
                    <div className="col-span-12 mb-1">
                      <label className="font-bold xl:text-sm md:text-sm text-base text-[#221F20]">
                        Search Company
                      </label>
                    </div>

                    <div className="col-span-12 mt-3">
                      <input
                        type="text"
                        className="w-full xl:w-[10rem] focus:!outline-none focus:border-red-700 py-4 border-gray-300 lg:w-[10rem] h-[1.6rem] placeholder:text-sm border-solid rounded border-[1px] pl-2"
                        value={props.key_word || ""}
                        onChange={onKeywordChange}
                      />
                    </div>
                  </div>
                  





                {/* Search Button */}
                <div className="pl-4 flex items-center lg:justify-start lg:pt-[25px] justify-center">
                  <div className="flex text-left justify-end gap-x-6">
                    <button
                      type="submit"
                      className="rounded-full px-8 lg:px-5 py-1 lg:py-0.5 xl:text-sm lg:text-xs text-base border-solid border-[1px] border-black font-semibold text-black shadow-sm"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
    </>
  );
};

export default Companyinfo;
