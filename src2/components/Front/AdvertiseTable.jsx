"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingComponents from "../LoadingComponents";

const AdvertiseTable = ({ user }) => {
  const [advertiseData, setAdvertiseData] = useState([]);
  const [headerData, setHeaderData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadpackage = async () => {
      try {
        const responseData = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}package`,
          { method: "GET" }
        );

        if (!responseData.ok) {
          throw new Error("Failed to fetch the data. Please try again.");
        }

        const dropdata = await responseData.json();

        setAdvertiseData(dropdata?.data?.result ?? []);
        setHeaderData(dropdata?.data?.header ?? {});
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    loadpackage();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingComponents />
      ) : (
        <table className="table-responsive w-full text-sm md:text-lg font-bold text-left text-[#221F20] font-lato">
          <thead className="text-3xl text-[#221F20] font-bold border-[#221F20] font-lato">
            <tr className="text-center">
              <th scope="col" className="px-3 py-3 border-collapse"></th>

              {headerData?.title?.map((columnName, index) => (
                <th
                  key={`header-${index}`}
                  scope="col"
                  className="align-baseline text-lg sm:text-xl md:text-2xl bg-[#C1272D] text-white px-3 py-3 border-2 border-[#221F20]"
                >
                  {columnName}
                  <br />

                  {headerData?.sold_price?.[index] !== undefined && (
                    <>
                      {parseFloat(headerData.sold_price[index]) > 0 ? (
                        <div className="pt-4">
                          <div className="flex justify-center">
                            <span className="pr-4 text-sm sm:text-lg md:text-xl font-medium whitespace-nowrap">
                              Price:
                            </span>
                            <span className="text-sm sm:text-lg md:text-xl font-medium whitespace-nowrap">
                              <del>
                                $
                                {parseFloat(
                                  headerData.price[index]
                                ).toFixed(2)}
                              </del>
                            </span>
                          </div>

                          <div className="flex justify-center">
                            <span className="pr-4 text-sm sm:text-lg md:text-xl font-medium whitespace-nowrap">
                              Introductory Price :
                            </span>
                            <span className="text-sm sm:text-lg md:text-xl font-medium whitespace-nowrap">
                              $
                              {parseFloat(
                                headerData.sold_price[index]
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-4">
                          <div className="flex justify-center">
                            <span className="pr-4 text-sm sm:text-lg md:text-xl font-medium whitespace-nowrap">
                              Price :
                            </span>
                            <span className="text-sm sm:text-lg md:text-xl font-medium whitespace-nowrap">
                              $
                              {parseFloat(
                                headerData.price[index]
                              ).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-xl md:text-2xl border-3 border-[#221F20]">
            {Object.keys(advertiseData).map((key, index) => (
              <tr
                key={`row-${index}`}
                className="bg-white border-2 border-[#221F20] text-center"
              >
                <th
                  scope="row"
                  className="px-4 md:px-6 py-4 border-2 border-[#221F20] font-semibold text-gray-900 whitespace-nowrap lg:text-2xl md:text-lg text-sm"
                >
                  {advertiseData[key]?.[0]}
                </th>

                {advertiseData[key]
                  ?.slice(1)
                  ?.map((cellData, cellIndex) => (
                    <td
                      key={`cell-${index}-${cellIndex}`}
                      className="px-6 md:px-6 py-4 border-2 border-[#221F20] font-medium lg:text-2xl md:text-lg text-sm whitespace-nowrap md:whitespace-normal"
                    >
                      {cellData}
                    </td>
                  ))}
              </tr>
            ))}

            <tr className="border-collapse text-center">
              <th
                scope="row"
                className="px-6 py-3.5 border-collapse font-semibold text-gray-900 whitespace-nowrap"
              ></th>

              {headerData?.slug?.map((slug, index) => (
                <td
                  key={`signup-${index}`}
                  className="sign_btn pt-8 md:px-0 py-3.5 border-collapse"
                >
                  <Link
                    href={user ? `/plan/${slug}` : "/register?guest=1"}
                    className="whitespace-nowrap text-center flex-none rounded-md bg-[#B13634] px-4 md:px-11 py-3 md:py-4 text-base md:text-xl text-sm tracking-wide font-medium font-lato text-white shadow-sm hover:bg-[#B13634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B13634]"
                  >
                    Sign Up Today
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default AdvertiseTable;
