// PageFlipComponent.js
"use client"; 
import { useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';

import filpcss  from  "./Style.module.css";
import Image from 'next/image';
import axios from 'axios';

const PageFlipComponent = ({slug,bannerContent,magazineData}) => {
const pageimage = "/images&icons/resources/Asset1.jpg";
const pageimage2 = "/images&icons/resources/Asset2.jpg";
  const id = slug;
  const bookRef = useRef(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [frontCover, setFrontData] = useState(magazineData.frontimage_url);
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
  
  useEffect(() => { 
    trackPublication();  
  }, [latitude,currentPageIndex]);
   

  useEffect(() => {
    const pageFlip = new PageFlip(bookRef.current, {
      width: 550,
      height: 733,
      size: "stretch",
      minWidth: 315,
      maxWidth: 1000,
      minHeight: 420,
      maxHeight: 1350,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false,
    });

    pageFlip.loadFromHTML(document.querySelectorAll(`.${filpcss.page}`));

    document.querySelector(".page-total").innerText = pageFlip.getPageCount();
    document.querySelector(`.${filpcss['page-orientation']}`).innerText = pageFlip.getOrientation();

    document.querySelector(".btn-prev").addEventListener("click", () => {
      pageFlip.flipPrev();
      trackPublication();
    });

    document.querySelector('.btn-next').addEventListener("click", () => {
      pageFlip.flipNext();
      trackPublication();
    });

    const pageFlipElement = document.querySelector(".page-current");
    if(pageFlipElement){
    pageFlip.on("flip", (e) => {
      const currentIndex = e.data + 1; // e.data is 0-based index
      setCurrentPageIndex(currentIndex);
      pageFlipElement.innerText = e.data + 1;
    });
    }
    // pageFlip.on("changeState", (e) => {
    //   document.querySelector(`.${filpcss['page-state']}`).innerText = e.data;
    // });

    const pageStateElement = document.querySelector(`.${filpcss['page-state']}`);
    if(pageStateElement) {
      pageFlip.on("changeState", (e) => {
        pageStateElement.innerText = e.data;
      });
    }

 const pageChangeOrientationElement = document.querySelector(`.${filpcss['page-orientation']}`);
 if(pageChangeOrientationElement) {
    pageFlip.on("changeOrientation", (e) => {
      pageChangeOrientationElement.innerText = e.data;
    });
  }
    // return () => {
    //   document.querySelector(".btn-prev").removeEventListener("click", pageFlip.flipPrev);
    //   document.querySelector(".btn-next").removeEventListener("click", pageFlip.flipNext);
    // };
  }, []); 

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
    <div className={`${filpcss['container-md']}`} style={{position: `relative`}}>
      <div className={`${filpcss['flip-book']}`} id="demoBookExample" ref={bookRef}>
          
          <div className={`${filpcss.page} ${filpcss['page-cover']} ${filpcss['page-cover-top']}`}  data-density="hard">
              <div className={`${filpcss['page-content']}`}>
                  <div className={`${filpcss['page-image']}`} >
                    <img
                      src={frontCover}
                      alt="image 1"
                      className={`${filpcss.page_images}`}
                    />
                  </div>
              </div>
          </div>
          {/* inner pages */}
          {flipData.map((item, index) => (  
          <div className={`${filpcss.page}`} key={index} number={index + 1}> 
              <div className={`${filpcss['page-content']}`}>
                  <div className={`${filpcss['page-image']}`}>
                    <img
                      src={item}
                      alt={`Image ${index + 1}`}
                      className={`${filpcss.page_images}`}
                    />
                  </div>
                  <div className={`${filpcss['page-footer']}`}>{index}</div>
              </div>
          </div>
           ))} 
        
          {/* page cover */}
          <div className={`${filpcss.page} ${filpcss['page-cover']} ${filpcss['page-cover-bottom']}`} data-density="hard">
              <div className={`${filpcss['page-content']}`}>
                  <div className={`${filpcss['page-image']}`}>
                    <img
                      src={endCover}
                      alt="image 1"
                      className={`${filpcss.page_images}`}
                    />
                  </div>
              </div>
          </div>
        </div>
    </div>
    <div className={`${filpcss.container}`}>
      <div className="flex justify-center items-center">
          <button type="button" id={`${filpcss.buttons}`} className="btn-prev" >Previous page</button>
          <div className="">[<span className="page-current">1</span> of <span className="page-total">-</span>]</div>
          <button type="button" id={`${filpcss.buttons}`} className="btn-next">Next page</button>
      </div>
      <div className="hidden">
          State: <i className={`${filpcss['page-state']}`}>read</i>, orientation: <i className={`${filpcss['page-orientation']}`}>landscape</i>
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default PageFlipComponent;
