import Graph from "@/components/Front/NewRegionalmanagerDashboard/Graph";
import Sideli from "@/components/Common/Sideli";
import DashBoardTableulli from "@/components/Front/NewRegionalmanagerDashboard/DashBoardTableulli";
import DashBoardTableBtn from "@/components/Front/NewRegionalmanagerDashboard/DashBoardTableBtn";
import Pagination from "@/components/Common/Pagination";
const DashBoardTabledata = (props) =>{

    return(
      <>
       
       <section className="top_grid"> 
             <div className="px-20">
                  <div className="grid grid-cols-3 sm:gap-16 ">
                  <Sideli/>
                  <Graph />
                  </div>
             </div>
          </section>
          <section className="pt-14"> 
          <div className="px-10"> 
          <DashBoardTableulli/>
          <DashBoardTableBtn name="View/Edit"/> 
           </div>
           <Pagination />
          </section>
    </>
        
    )
}

export default DashBoardTabledata