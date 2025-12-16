
import TabComponent from "@/components/Front/TabComponent";
import DashboardTopPage from "./DashboardTopPage";

export const metadata = {
  title: 'Vendor Guide | Company Dashboard'
}

const Dashboard = () => {
  return (
    <>
      <section className="top_grid">
        <div className="px-20">
          <DashboardTopPage />
        </div>
      </section>
      <section className="pt-14">
        <div className="px-10">
          <TabComponent/>
        </div>
      </section>
    </>  
  );
};

export default Dashboard;
