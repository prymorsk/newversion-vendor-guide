"use client";

import MultiLineChart from "@/components/MultiLineChart";

const Graph = ({ dashboardData }) => {
  return (
    <div className="col-span-3 md:col-span-2 lg:col-span-2 order-1 md:order-2 sm:mb-0 mb-8">
      <div className="border border-black bg-white mt-12">
        <div className="grid grid-cols-12 sm:gap-8">
          <div className="col-span-12 lg:col-span-7 md:col-span-7 order-2 sm:order-1">
            <div className="card pl-4">
              <div className="card-body pb-0">
                <h6 className="pl-10 font-semibold text-lg pt-6">
                  Bid Activity
                </h6>
              </div>

              <div className="card-body flex flex-wrap gap-3">
                <MultiLineChart lineData={dashboardData ?? []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
