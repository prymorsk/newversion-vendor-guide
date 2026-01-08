"use client";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/UserContext";


const PartnerSection = ({homeMeta}) => {
const {user,isLoding,isInfoLoding,logout}  = useAuth();

//console.log('homeMeta loading');
//console.log(homeMeta);
//console.log('user loading');
//console.log(user);
 

  return (
    <>
      <div id="partner_section" className="relative isolate overflow-hidden ">
        <div className="mx-auto max-w-7xl pt-0 px-6 py-8 lg:py-0 lg:pt-4 lg:px-8">
          <div className="mx-auto  max-w-2xl grid-cols-1  lg:max-w-none lg:grid-cols-2">
            <div className="max-w-2xl  mx-auto text-center">
              {homeMeta?.partner_title &&
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold  tracking-normal text-[#B13634]  font-lato">
                   {homeMeta?.partner_title}
              </h2>}
              <p className="mt-3 text-lg sm:text-xl lg:text-[1.400rem] lg:leading-9 text-[#221F20] font-medium md:font-semibold font-lato">
                   {homeMeta?.partner_text}
              </p>
              <div className="pt-7 md:pt-9 gap-x-4 text-center block">
               
 {user?.name ? 

 (<Link
                  href="/plan/elite"
                  className="inline-block text-center flex-none rounded-md bg-[#B13634] px-8 sm:px-11 py-2 lg:py-3 text-base sm:text-lg lg:text-xl tracking-wide font-medium font-lato text-white shadow-sm hover:bg-[#B13634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B13634]"
                >
                  Sign Up Today 
                </Link>) : 

 (<Link
                  href="/register"
                  className="inline-block text-center flex-none rounded-md bg-[#B13634] px-8 sm:px-11 py-2 lg:py-3 text-base sm:text-lg lg:text-xl tracking-wide font-medium font-lato text-white shadow-sm hover:bg-[#B13634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B13634]"
                >
                  Sign Up Today
                </Link>)

 }

                

                

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerSection;
