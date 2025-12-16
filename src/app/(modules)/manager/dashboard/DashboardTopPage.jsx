
"use client";
import Graph from "@/components/Front/NewRegionalmanagerDashboard/Graph";
import Sideli from "@/components/Common/Sideli";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import LoadingComponents from "@/components/LoadingComponents";

const DashboardTopPage = () => {
  const [isPageLoading,setIsPageLoading] = useState(true);
  const [dashboardData,setDashboardData] = useState(null);
  useEffect(() => {
    
    const loadDashboardData = async () => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
      await axios.get(`bid-graph-chart-day?token=${getCookie('token')}`, {}).then(response => {
        const res = response.data?.data;
        setDashboardData(res);
        setIsPageLoading(false)
          // console.log(response.data.data.side_bar);
      }).catch(error => {
          
          // console.log(error.response.data);
          var errors = error?.response?.data?.data;
          if(errors){
              const errorArray = Object.keys(errors).map((key) => {
                  toast.error(errors[key][0], {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                  });
                  
              });
          }else if(error?.response?.data?.message){
              toast.error(error?.response?.data?.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
              });
          }
          
      });
      
    }
    loadDashboardData();
  }, [])
  return (
    <>
    { isPageLoading ? 
        <div className="flex justify-center items-center h-full">
            <LoadingComponents />
        </div> :
        <div className="grid grid-cols-3 sm:gap-16 ">
          <Sideli dashboardData={dashboardData} />
          <Graph dashboardData={dashboardData} />
        </div>
    }
    </>
  );
};

export default DashboardTopPage;
