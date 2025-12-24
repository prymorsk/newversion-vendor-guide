"use client";

import TableData from "./TableData";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import LoadingComponents from "@/components/LoadingComponents";
import Link from "next/link";

const ManagerBids = ({ bidId }) => {
  console.log("bid id:", bidId);

  const { user, userAllInfo } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <section className="inner hero-section commonpage">
        <div className="container mx-auto px-4 flex flex-row gap-4 items-center"></div>
      </section>

      <section className="innerpage-wapper-sections">
        <div className="container mx-auto">
          <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 flex-col lg:flex-row gap-10 border border-gray-300 leading-relaxed text-gray-800">
            <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato lg:px-10">
              Bids
            </h1>

            <div className="container mx-auto overflow-hidden xl:px-24 lg:px-8 md:px-12">
              <div className="mx-auto max-w-7xl">
                {/* Pass bidId to TableData */}
                <TableData bidId={bidId} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManagerBids;
