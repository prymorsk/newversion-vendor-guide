// PageFlipComponent.js
"use client"; 
import { useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';
import pageimage from "@/../../public/images&icons/resources/Asset1.jpg";
import pageimage2 from "@/../../public/images&icons/resources/Asset2.jpg";
import filpcss  from  "./Style.module.css";
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';


const PageFlipComponent = ({slug,bannerContent,magazineData}) => {

  const id = slug;
  const bookRef = useRef(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [frontCover, setFrontData] = useState(magazineData.frontimage_url);
  const [frontCoverLink, setfrontCoverLink] = useState(magazineData.front_image_link);

  const [endCover, setEndData] = useState(magazineData.endimage_url);
  const [allData, setAllData] = useState(magazineData);
  const [totalPage, setTotalPage] = useState(0);
  const [flipData, setFlipData] = useState(magazineData.pages);
  const [currentPageIndex, setCurrentPageIndex] = useState('');


  const trackPublication =  () => {
    const currentUrl = window.location.href;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude); 
        }, 
      );
    }
    if(latitude && currentPageIndex !== ''){
      const data = {
        'url' : currentUrl,
        'latitude' : latitude,
        'longitude' : longitude, 
        'page_visit' : currentPageIndex,  
      }; 
      const response = axios.post(`${process.env.NEXT_PUBLIC_API_URL}track-publication`,data)
    }
  };
  
  

  return (
    <>

    
     <div
        id="hero_section"
        className=" bg-cover bg-center bg-no-repeat relative before:content[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#08161eab] xl:h-[40vh] lg:h-[40vh] md:h-[40vh] sm:h-[40vh] h:[40vh]"
        
        >
          <Image
              src={bannerContent?.hero_background}
              alt="Product screenshot"
              className="mx-auto max-w-none xl:h-[40vh] lg:h-[40vh] md:h-[40vh] sm:h-[40vh] h:[40vh] object-cover w-full"
              width="100"
              height="100"
            />
          <div className="absolute top-0 left-0 right-0 sm:h-[40vh] md:h-[40vh] lg:h-[40vh] h-[36vh] w-full max-w-5xl mx-auto">
            <main className="magazine_heading px-4 sm:px-6 lg:px-8 z-10 lg:py-12 relative text-center">
              <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[3rem] font-lato -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold  text-white   font-lato lg:px-10">
                {allData?.title}
              </h1>
            </main>
          </div>
        </div>

     <div className={`${filpcss['demo-block']} `} id="demoBlock">
	  <div className="mx-auto">
		<div className={`${filpcss['page-image']}`} >
		
		
		{ (frontCoverLink) 
		?
		
		<Link target="_blank" href={frontCoverLink}><img className="mx-auto"
		src={frontCover}
		alt="image 1"/>
		</Link>
		
	
	 :
	 
	  <div className="text-center">No data found </div>
	
	
	
	
		}
	 </div>
	
	</div>
	</div>
	
    </>
  );
};

export default PageFlipComponent;
