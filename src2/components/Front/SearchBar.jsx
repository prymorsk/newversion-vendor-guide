"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Image from "next/image";

const SearchBar = ({homeMeta,categories,states,homeBannerText}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [SearchState, setSearchState] = useState("");
  const [stateName, setstateName] = useState("");
  const [SearchCity, setSearchCity] = useState("");
  const [cityData, setcityData] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [isFetchingData, setIsFetchingData] = useState(false);

  const Router = useRouter();
  const Pathname = usePathname();


const fetchData = async (stateName) => {
			try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}get-market-city?state_name=${stateName}`, {
			method: "GET",
			headers: {
			Authorization: `Bearer ${getCookie("token")}`,
			},
			});

			if (!response.ok) {
			setIsLoding(false);
			throw new Error("Failed to fetch city data. Please try again.");
			}

			const cityResult = await response.json();

			setcityData(cityResult);
			setIsLoding(false);

			} catch (error) {
			setIsLoding(false);
			console.error("Error fetching data:", error);
			} finally {
			setIsFetchingData(false);
			}
        };






//handleSearch
  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams()
    var serchKey = Pathname+'vendors?';
    if(searchInput){
      params.set('key_word',searchInput);
    }
    if (searchCategory) {
      params.set('category',searchCategory);
    }
	
    if (SearchState) {
      params.set('state',SearchState);
    }
	if (SearchCity) {
      params.set('city',SearchCity);
    }
	
	if (stateName) {
      params.set('stateName',stateName);
    }
	
	
	
	 if (!searchCategory &&  !SearchState  &&  !searchInput) {
      alert('Please select state or category or company name.')
      return false
    }
	
    var urlString = params.toString();
    Router.push(serchKey+urlString)
  };
  //handleSearch end
  
  //stateHandle start
  const stateHandle = (e) => {
	     
		  setstateName(e.target.selectedOptions[0].dataset.name);
          setSearchState(e.target.value);
		  fetchData(e.target.selectedOptions[0].dataset.name);
		 

		
		
         };
  //stateHandle end
  
  
  
  
  
  return (
    <section className="searchbar-section w-full bg-[#000] p-8">
      <form onSubmit={handleSearch}>
        <div className="container mx-auto">
         
          <h4 className="text-center mb-5 text-[#fff]"> {homeMeta?.hero_title}</h4>

          <div className="searchbar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">

              



              <div className="relative w-full inline-block">
                <select 
                  className="w-full appearance-none px-5 py-3 rounded-full border border-gray-300 bg-white text-sm w-40 cursor-pointer focus:outline-none" value={SearchState}
                      onChange={stateHandle}>
                        <option className=" " value="">Select State</option>
                        {states?.data && states?.data.map((row,i)=>{
                          return(
                            <option data-name={row.name} key={i} value={row.id}>{row.name}</option>
                          )
                        })}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src="images/down-arrow.svg" alt="down" width={10} height={6} />
                </span>
              </div>



            <div className="relative w-full inline-block">
            <select 
            className="w-full appearance-none px-5 py-3 rounded-full border border-blue-400 bg-white text-sm w-48 cursor-pointer focus:outline-none" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} >
            <option className="" value="">Select Category</option>
            {categories?.data && categories?.data.map((row,i)=>{
            return(
            <option key={i} value={row.id}>{row.title}</option>
            )
            })}
            </select>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Image src="images/down-arrow.svg" alt="down" width={10} height={6} />
            </span>
            </div>


              <div className="relative w-full inline-block">
                <select 
                  className="w-full appearance-none px-5 py-3 rounded-full border border-gray-300 bg-white text-sm w-40 cursor-pointer focus:outline-none" value={SearchCity} onChange={(e) => setSearchCity(e.target.value)}>
                        <option className=" " value="">Select City</option>
                        {cityData?.data && cityData?.data.map((row,i)=>{
                          return(
                            <option key={i} value={row.market_city}>{row.market_city}</option>
                          )
                        })}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src="images/down-arrow.svg" alt="down" width={10} height={6} />
                </span>
              </div>




              <input 
                type="text" 
                name="keyword"
                id="default-search"
                placeholder="Company Name"
                className="w-full px-5 py-3 rounded-full border border-gray-300 bg-white text-sm w-48 focus:outline-none" value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
              />
              

              <button   type="submit"
                className="w-full px-6 py-3 rounded-full bg-[#A32424] text-white text-sm font-medium border border-white hover:bg-[#8b1e1e] transition">
                SEARCH NOW
              </button>
            
           
          </div>
        </div>
        </form>
      </section>
  );
};

export default SearchBar;
