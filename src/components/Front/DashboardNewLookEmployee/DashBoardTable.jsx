// import DashBoardTableulli from "@/components/Front/NewRegionalmanagerDashboard/DashBoardTableulli";
import Link from "next/link";

const DashBoardTable = (props) => {
  const collums = props.data.collums;
  const rows = props.data.rows;
  return (
    <>
      {/* <ul className="hidden text-sm font-medium text-center border-[1px] border-b-0 border-black  text-gray-500 divide-x divide-gray-200  shadow sm:flex ">
        <DashBoardTableulli
          name="All Employees"
          bgcolor="bg-black"
          textcolor="text-white"
          width="w-64"
        />
      </ul> */}
      <div className="relative overflow-x-auto border-[1px] border-[#171717]">
        <table
          id="datatable"
          className="table w-full  text-gray-700  dataTable no-footer dt-responsive"
          aria-describedby="datatable_info"
        >
          <thead>
            <tr>
              {collums.map((row,i) => {
                return (
                  <th
                    key={i}
                    className="p-4 pr-8 border-b-[1px] border-[#171717]  text-[#221F20] sorting sorting_asc whitespace-nowrap "
                    tabIndex="0"
                    aria-controls="datatable"
                    rowSpan="1"
                    colSpan="1"
                    aria-sort="ascending"
                    aria-label="Name: activate to sort column descending"
                  >
                    {row}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row,i) => {
              return (
                <tr key={i} className="odd font-semibold text-black">
                  {row.map((r1,i) => {
                    return (
                      <td
                        key={i}
                        className="p-4 pr-8  border-b-[1px] border-[#171717] sorting_1 whitespace-nowrap text-sm"
                      >
                        {" "}
                        <Link
                          href=""
                          className="border-b-2 border-transparent hover:border-red-700 hover:text-red-700"
                        >
                          {r1}
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashBoardTable;
