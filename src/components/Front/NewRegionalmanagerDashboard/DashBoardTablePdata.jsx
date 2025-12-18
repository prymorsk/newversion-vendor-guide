
import DashBoardTableulli from "@/components/Front/NewRegionalmanagerDashboard/DashBoardTableulli";
import DashBoardTableBtn from "@/components/Front/NewRegionalmanagerDashboard/DashBoardTableBtn";
import Pagination from "@/components/Common/Pagination";
const DashBoardTablePdata = (props) =>{

    return(
      <>
       
      
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

export default  DashBoardTablePdata 
