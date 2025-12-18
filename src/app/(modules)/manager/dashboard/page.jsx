import { Suspense } from "react";
import DashboardTopPage from "./DashboardTopPage";
import TabComponent from "@/components/Front/TabComponent";
export const dynamic = "force-dynamic";

const DashboardPage = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64">Loading dashboard...</div>}>
      <section className="top_grid">
        <div className="px-10 sm:px-20">
          <DashboardTopPage />
        </div>
      </section>

      <section className="pt-8 sm:pt-14">
        <div className="px-10 sm:px-10">
          <TabComponent />
        </div>
      </section>
    </Suspense>
  );
};

export default DashboardPage;
