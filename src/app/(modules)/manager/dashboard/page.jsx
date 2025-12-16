import TabComponent from "@/components/Front/TabComponent";
import DashboardTopPage from "./DashboardTopPage";

export const metadata = {
  title: 'Vendor Guide | Dashboard'
}

const Dashboard =  () => {
  
  return (
    <>
      <section className="top_grid">
        <div className="px-10 sm:px-20">
          <DashboardTopPage />
        </div>
      </section>
      <section className="pt-8 sm:pt-14">
        <div className="px-10 sm:px-10">
          <TabComponent/>
        </div>
      </section>
    </>
  );
};


export default Dashboard;