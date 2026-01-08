"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import LoadingComponents from "../LoadingComponents";

const ResourceBannerSection = ({ title }) => {
  const [isLoading, setLoading] = useState(true);
  const [magazineData, setMagazineData] = useState([]);
  
  // ✅ Prevent repeated API calls
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return; // already fetched
    dataFetchedRef.current = true;

    const fetchMagazine = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}magazine?limit=5`
        );
        setMagazineData(response.data.data || []);
      } catch (error) {
        console.error("Magazine fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMagazine();
  }, []);

  const carouselTemplate = (row) => (
    <Link target="_blank" href={row.front_image_link} key={row.id || row.title}>
      <div className="sm:mt-0 sm:px-7 xl:px-9">
        <Image
          src={row.image_url}
          className="w-full h-[100%] xl:h-[100%] object-fill"
          alt={row.title}
          width={100}
          height={100}
        />
        <div className="text-center mt-4">
          <Link
            target="_blank"
            href={row.front_image_link}
            className="my-4 xl:my-9 block px-4 py-2 rounded-full bg-[#221F20] text-white font-medium text-lg xl:text-xl hover:bg-[#221F20]"
          >
            {row.title}
          </Link>
          <p className="xl:text-xl text-lg font-bold text-[#171717b]">
            {row.short_description}
          </p>
        </div>
      </div>
    </Link>
  );

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 5, numScroll: 1 },
    { breakpoint: "768px", numVisible: 5, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  return (
    <div className="image_grid block relative bottom-[7rem]">
      <div className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col">
        <div className="blogimage_content text-center px-2 sm:px-0 pt-3 md:pt-4 lg:pt-6">
          <h2 className="lg:text-2xl sm:text-xl text-lg font-bold tracking-tight text-[#171717b]">
            {title}
          </h2>
        </div>

        <div className="block py-4 sm:py-6 xl:py-10">
          {isLoading ? (
            <LoadingComponents />
          ) : (
            <Carousel
              value={magazineData}
              itemTemplate={carouselTemplate}
              numVisible={5}
              numScroll={1}
              responsiveOptions={responsiveOptions}
              circular
              showIndicators={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceBannerSection;
