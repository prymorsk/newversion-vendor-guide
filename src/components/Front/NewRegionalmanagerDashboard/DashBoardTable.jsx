
import Link  from "next/link"
import Loading from "@/app/loadingScreen" 
const DashBoardTable = (props) =>{

    const collums = props.data.collums
    const rows = props.data.rows
    
    return(
      <>
    <div className="relative overflow-x-auto border-[1px] border-black ">
        <table id="datatable" className="table w-full  text-gray-700  dataTable no-footer dt-responsive" aria-describedby="datatable_info">
            <thead>
                <tr>
                {
                collums.map((row,i) => {
                    return (
                        <th key={i} className="p-4 pr-8 border-b-[1px] border-black  text-black sorting sorting_asc whitespace-nowrap text-black text-left" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending">{row}</th>
                    )
                })
            }
                </tr>
            </thead>
            <tbody>
            
 {rows && rows.map((row,i) => {

    return (
        <tr key={`row${i}`} className="odd font-semibold">
                    
                {
                    row.map((r1,j) => {
                        return (
                        <td key={j} className="p-4 pr-8  border-b-[1px] border-black sorting_1 whitespace-nowrap text-sm justify-around">  <Link  href="" className="border-b-2 border-transparent hover:border-red-700 hover:text-red-700">{r1}</Link></td>
                        
                        
                        )
                    })
                }
            </tr>
    )
})
}
{(props.isLoading) ? <tr  className="odd font-semibold"><Loading/></tr> : ""}
            </tbody>
        </table>
   
    </div>
    </>
        
    )
}

export default DashBoardTable