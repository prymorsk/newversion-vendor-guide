"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const ContractorHomepage = ({ contractors }) => {
  const [contractorsData] = useState(contractors);

   return (
    <>
      {Array.isArray(contractorsData) && contractorsData.length > 0 && (
        <div className="w-full md:w-[40%]">
          <div className="contrtitle">Featured partner spotlight</div>

          <div className="fourprofile-listing">
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contractorsData.slice(0, 4).map((item) => {
                const title = item.title;
                const match = title.match(/\(([^)]+)\)/);

                const mainTitle = match
                  ? title.replace(/\s*\([^)]+\)/, "")
                  : title;

                const tag = match ? match[1] : null;

                return (
                  <div key={item.id}>
                    {/* Image wrapper enforces size */}
                    <div className="bg-white rounded-xl shadow-xl p-4">
                      <Link
                        href={item?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={item.image_url}
                          alt={item.title || "profile"}
                          width={288}
                          height={354}
                          className="object-cover mx-auto"
                        />

                        <div className="mt-4 flex items-center cotrtitletop">
                          <h3 className="font-semibold text-lg cotrtitletopsub ">

                            {mainTitle}

                            {tag && (
                              <>
                                <br />
                                {tag}
                                
                              </>
                            )}

                            
                          </h3>
                         <span className="w-3 h-3 bg-green-500 rounded-full ml-2 cotrtitlegren"></span>

                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );


};

export default ContractorHomepage;
