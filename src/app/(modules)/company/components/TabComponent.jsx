"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/UserContext";
import BidAllData from "./BidAllData";
import FavoriteAllData from "./FavoriteAllData";


const TabComponent = () => {
  const {user,renderFieldError,isLoding}  = useAuth();
  const [tabnumber, settabNumber] = useState(1);
  return (

    <>
      <div className="listingTab_sec mt-4" >
        <div className="listingTabs">
          <div className="taboverflow">
            <ul className="nav mb-0 hidden text-sm font-medium text-center border-[1px] border-b-0 border-black  text-gray-500 divide-x divide-gray-200  shadow sm:flex " id="pills-tab" role="tablist">
              <li className={`nav-item w-full ${tabnumber == 1 ? "active" : ""} `}>
                <button
                  className={`nav-link inline-block border-r-[1px] border-black w-full p-4 font-semibold focus:outline-none" aria-current="page  ${tabnumber == 1 ? "active" : ""} `}
                  type="button"
                  onClick={() => {settabNumber(1)}}
                >
                  All Bids
                </button>
              </li>
              {/* <li className={`nav-item  w-full  ${tabnumber == 2 ? "active" : ""} `}>
                <button
                  className={`nav-link inline-block border-r-[1px] border-black w-full p-4 font-semibold focus:outline-none" aria-current="page  ${tabnumber == 2 ? "active" : ""} `}
                  type="button"
                  onClick={() => {settabNumber(2)}}
                >
                  Favorites
                </button>
              </li> */}
            </ul>
          </div>

          {/* <!-- ============= || tab-content  || =========== --> */}

          <div className="tab-content" id="pills-tabContent">
            <div className="relative overflow-x-auto  ">
            {tabnumber == 1 &&  <BidAllData />}
            {/* {tabnumber == 2 &&  <FavoriteAllData />} */}
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default TabComponent