
const Graph = (props) =>{
    return(
      <div className="col-span-12  md:col-span-8 lg:col-span-8   order-1 md:order-2  sm:mb-0 mb-5">
      <div className="border-solid border-[1px] border-black bg-white mt-12">
          <div className="grid grid-cols-12 sm:gap-8 ">
              <div className="col-span-12 lg:col-span-7 md:col-span-7  order-2 sm:order-1 ">
                 
                  <div className="card pl-4">
                      <div className="card-body pb-0">
                          <h6 className="pl-10 font-semibold text-lg pt-6">Bid Activity</h6>
                      </div>
                      <div className="card-body flex flex-wrap gap-3">
                          <div id="line_chart_datalabel" data-colors='["#5156be", "#2ab57d"]' className="apex-charts w-full" dir="ltr"></div>                              
                      </div>
                  </div>

              </div>
              <div className="col-span-12 lg:col-span-5 md:col-span-5  order-2 sm:order-1 ">
                  <div className="grid grid-cols-12 pt-6">
                      <div className="col-span-12  md:col-span-6  order-2 sm:order-1 ">
                          <p className="font-semibold text-lg"> Sort <span><i className="fa fa-sort" aria-hidden="true"></i></span></p>
                              <ul className="text-gray-700 pl-3">
                                  <li className="font-semibold text-xs">Person</li>
                                  <li className="font-semibold text-xs">Property</li>
                              </ul>
                      </div>
                      <div className="col-span-12 md:col-span-6  order-2 sm:order-1 ">
                          <div className="col-span-12  md:col-span-6  order-2 sm:order-1 ">
                              <p className="font-semibold text-lg"> TimeFrame <span><i className="fa fa-sort" aria-hidden="true"></i></span></p>
                                  <ul className="text-gray-700 pl-16">
                                      <li className="font-semibold text-xs">Day</li>
                                      <li className="font-semibold text-xs">Week</li>
                                      <li className="font-semibold text-xs">Month</li>
                                      <li className="font-semibold text-xs">Year</li>
                                  </ul>
                          </div>

                      </div>
                  </div>

                  <div className="pt-16">
                      <ul className="text-gray-700 pl-3">
                          <li className="font-semibold text-xs"><span className="pr-3"><i className="fa fa-window-minimize text-blue-600" aria-hidden="true"></i></span>Bids Created</li>
                          <li className="font-semibold text-xs "><span className="pr-3"><i className="fa fa-window-minimize text-emerald-500" aria-hidden="true" ></i></span>Issued Bids</li>
                          <li className="font-semibold text-xs "><span className="pr-3"><i className="fa fa-window-minimize text-red-600" aria-hidden="true"></i></span>Closed Bids</li>
                          <li className="font-semibold text-xs "><span className="pr-3"><i className="fa fa-window-minimize text-orange-400" aria-hidden="true"></i></span>Awarded Bids</li>
                          <li className="font-semibold text-xs"><span className="pr-3"><i className="fa fa-window-minimize text-lime-400" aria-hidden="true"></i></span>Cancelled Bids</li>
                         
                      </ul>
                  </div>
              </div>
          </div>   
          
      </div>
  </div>
        
    )
}

export default Graph