import SaveEditButton from "@/components/Front/SaveEditButton";
import TableCheckbox from "@/components/Front/Company/TableCheckbox"
// import DashBoardTableulli from "@/components/Front/NewRegionalmanagerDashboard/DashBoardTableulli"
import Link  from "next/link"

const DashBoardTableBtn = (props) =>{

    return(
    <div className="my-10"> 
        <form>
            <div className="flex text-center justify-end gap-x-6 lg:pr-0">
                <SaveEditButton name={props.name}/>
            </div>
        </form>
    </div>
        
    )
}

export default DashBoardTableBtn