"use client";
import Image from "next/image";
import { getResponse } from "@/app/lib/load-api";
import { useEffect, useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import Link from "next/link";
import { getVendors } from "@/app/lib/server-api";
import LoadingComponents from "../LoadingComponents";
import { useAuth } from "@/context/UserContext";


const BannerSectionCardHome = (props) => {
const [latitude, setGeoLatitude] = useState(0);
const [longitude, setGeoLongitude] = useState(0);
const {loading} = useAuth();
const [vendors,setVendors] = useState('');
const [checkvendors,setCheckvendors] = useState(true);


useEffect(()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
     
	  setGeoLatitude(position.coords.latitude);
	  setGeoLongitude(position.coords.longitude);
	  
	   //setGeoLatitude(44.9207245);
	   //setGeoLongitude(-93.46984529999999);
    });
	
const fetchData = async () => {
	
      try {
	      
        let  vendorsdata = await getVendors({latitude,longitude});
        console.log("Home Latitude is :", latitude);
         console.log("Home Longitude is :", longitude);
	  
	  
			console.log('Featured  vendors');
			console.log( vendorsdata);
			console.log('Featured vendors end'); 
            if(vendorsdata.count>0){console.log('BannerSectionCardHome vendors sssssssssss counts found');  setVendors(vendorsdata); setCheckvendors(false);}
           
		
		
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

   
   
	 
const timer = setTimeout(() => {

        if(checkvendors)
        {
        console.log('featured  fetching'); 

        fetchData();  
        }


    }, 2000);

    return () => clearTimeout(timer);

	
	
	
  });
 
 

 
  return (
  
    <div>
	
		{vendors.count > 0  ? ( <h2 className="lg:text-2xl text-xl font-bold tracking-tight  text-[#171717b] sm:mt-4 px-4 md:px-8 text-center">Featured Suppliers</h2>):''}

   
    <div className="flex items-center justify-center gap-2 md:gap-5 sm:mt-4 px-4 md:px-8 lg:my-4 my-2">
	
{loading?(
  <LoadingComponents/>
)
:(
<>
  {vendors?.data && vendors?.data.map((row, i) => {
    return (
      <div
        key={i}
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
    );
  })}

</>
)  
}
    </div> </div>
  );
};

export default BannerSectionCardHome;
