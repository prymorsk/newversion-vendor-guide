"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import MultiLineChart from "@/components/MultiLineChart";
const Graph = ({dashboardData}) =>{
    return(
      <div className="col-span-3  md:col-span-2 lg:col-span-2   order-1 md:order-2  sm:mb-0 mb-8">
      <div className="border-solid border-[1px] border-black bg-white mt-12">
          <div className="grid grid-cols-12 sm:gap-8 ">
              <div className="col-span-12 lg:col-span-7 md:col-span-7  order-2 sm:order-1 ">
                 
                  <div className="card pl-4">
                      <div className="card-body pb-0">
                          <h6 className="pl-10 font-semibold text-lg pt-6">Bid Activity</h6>
                      </div>
                      <div className="card-body flex flex-wrap gap-3">
                      <MultiLineChart lineData={dashboardData} />
                      </div>
                  </div>

              </div>
              {/* <div className="col-span-12 lg:col-span-5 md:col-span-5  order-2 sm:order-1 ">
                  <div className="grid grid-cols-12 pt-6">
                      <div className="col-span-12  md:col-span-6  order-2 sm:order-1 ">
                          <p className="font-semibold text-lg flex gap-2 items-center"> Sort <span ><FontAwesomeIcon icon={faSort} className="w-[0.6rem]"/></span></p>
                              <ul className="text-gray-700 pl-3">
                                  <li className="font-semibold text-xs">Person</li>
                                  <li className="font-semibold text-xs">Property</li>
                              </ul>
                      </div>
                      <div className="col-span-12 md:col-span-6  order-2 sm:order-1 ">
                          <div className="col-span-12  md:col-span-6  order-2 sm:order-1 ">
                              <p className="font-semibold text-lg flex gap-2 items-center"> TimeFrame <span><FontAwesomeIcon icon={faSort} className="w-[0.6rem]"/></span></p>
                                  <ul className="text-gray-700 pl-16">faSort
                                      <li className="font-semibold text-xs">Day</li>
                                      <li className="font-semibold text-xs">Week</li>
                                      <li className="font-semibold text-xs">Month</li>
                                      <li className="font-semibold text-xs">Year</li>
                                  </ul>
                          </div>

                      </div>
                  </div>

                  <div className="pt-14">  
                      <ul className="text-gray-700 pl-3">
                          <li className="font-semibold text-xs flex items-baseline"><span className="pr-3"><FontAwesomeIcon icon={faWindowMinimize} className="text-blue-600 w-[1.2rem]" /></span>Bids Created</li>
                          <li className="font-semibold text-xs flex items-baseline"><span className="pr-3"><FontAwesomeIcon icon={faWindowMinimize} className="text-emerald-500 w-[1.2rem]" /></span>Issued Bids</li>
                          <li className="font-semibold text-xs flex items-baseline"><span className="pr-3"><FontAwesomeIcon icon={faWindowMinimize} className="text-red-600 w-[1.2rem]" /></span>Closed Bids</li>
                          <li className="font-semibold text-xs flex items-baseline"><span className="pr-3"><FontAwesomeIcon icon={faWindowMinimize} className="text-orange-400 w-[1.2rem]" /></span>Awarded Bids</li>
                          <li className="font-semibold text-xs flex items-baseline"><span className="pr-3"><FontAwesomeIcon icon={faWindowMinimize} className="text-lime-400 w-[1.2rem]" /></span>Cancelled Bids</li>
                         
                      </ul>
                  </div>
              </div> */}
          </div>   
          
      </div>
  </div>
        
    )
}

export default Graph