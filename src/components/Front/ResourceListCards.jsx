"use client";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import LoadingComponents from "../LoadingComponents";
import PaginationCustum from "../Common/Paginations";
const ResourceListCards = (props) => {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, items.length);
  const itemsToDisplay = items.slice(startIndex, endIndex);
  const [totalPage, setTotalPage] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    const getProducts = async (page = 1) => {
      const params = new URLSearchParams();
      const offset = (page - 1) * pageSize;
      params.set("page", offset);
      //console.log('offset', offset);
      const urlString = params.toString();
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}blog?limit=9&${urlString}`
          // ,{
          //   params: {
          //     page: offset,
          //   }
          // }
        );
        const result = response.data;
        setItems(result.data);
        setTotalPage(Math.ceil(result.Count / pageSize));
        //console.log('totalPage', totalPage);
        //console.log('result.data=', result.data);
        //console.log('result.Count=', result.Count);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setLoading(false);
      }
      setIsFetchingData(false);
    };
    getProducts((currentPage));
  }, [currentPage, pageSize]);

  const handlePageChange = (pageNumber) => {
    setIsFetchingData(true);
    setCurrentPage(pageNumber);
  };

  return (
    <>
          <div className="text-center py-10 sm:py-0">
            <Link
              href="#"
              className="readblog_btn inline-block px-10 sm:px-20 lg:px-40 2xl:px-56 py-2 lg:py-2 2xl:py-3 text-center rounded-full bg-[#B13634] 2xl:text-3xl lg:text-2xl text:xl tracking-wide font-semibold font-lato text-white shadow-sm hover:bg-[#B13634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B13634]"
            >
              {props.title}
            </Link>
          </div>
          {isLoading || isFetchingData ? (
            <LoadingComponents />
          ) : (
            <>

              <div className="xl:mt-16 lg:mt-16 md:mt-12 sm:mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-12">
                {items.map((row, i) => (
                  <div className="group relative" key={i}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden  bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                      <Link href={`/blog/${row.slug}`}>
                        <Image
                          src={row.image_url}
                          alt={row.title}
                          width="100"
                          height="100"
                          className="h-full w-full object-coverRR object-center lg:h-full lg:w-full"
                        />
                      </Link>
                    </div>
                    <div className="mt-4 md:mx-6  xl:ml-10 md:text-left text-center">
                      <div>
                        <Link href={`/blog/${row.slug}`}>
                          <h2 className="lg:text-xl text-lg  text-[#B13634] font-bold ">
                            {/* <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              ></span> */}
                            {row.title}
                          </h2>
                        </Link>
                       
                      </div>
                    </div>
                  </div>
                ))}

              </div>
              {totalPage > 1 && (
                <PaginationCustum
                  total={totalPage}
                  current={currentPage}
                  onChange={handlePageChange}
                />
              )}
            </>
          )}
        
    </>
  );
};

export default ResourceListCards;
