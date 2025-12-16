"use client";
import Graph from "@/components/Front/NewRegionalmanagerDashboard/Graph";
import Sideli from "@/components/Common/Sideli";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TabComponent from "../components/TabComponent";

const Dashbordcompany = () => {
  const router = useRouter();
  
  useEffect(() => {
    if(!getCookie('token')){
      router.push('/');
    }
  }, []);

  return (
    <>
      <section className="top_grid">
        <div className="px-20">
          <div className="grid grid-cols-3 sm:gap-16 ">
            <Sideli />
            <Graph />
          </div>
        </div>
      </section>
      <section className="pt-14">
        <div className="px-10">
          <TabComponent/>
          {/* <DashBoardTableBtn name="View/Edit" /> */}
        </div>
        <div className="flex items-center justify-between  px-4 py-3 sm:px-6">
          {/* <Pagination /> */}
        </div>
      </section>
    </>
  );
};

export default Dashbordcompany;
