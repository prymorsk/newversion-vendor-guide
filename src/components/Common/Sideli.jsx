import Sidecount from "@/components/Common/Sidecount";
import { Fragment } from "react";

const Sideli = ({dashboardData}) => {
  const rows = dashboardData?.side_bar;
  // console.log(rows);
  return (
    <div className="col-span-3 lg:col-span-1 md:col-span-1  order-2 sm:order-1">
      <div className="sm:mt-6 lg:mt-12 ">
        <ul className="bg-white list-unstyled font-medium border-solid border-[1px] border-[#171717]">
        {rows && rows.map((col, i) => (
          <Fragment key={i}>
            <Sidecount count={col.count} name={col.name}  />
          </Fragment>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default Sideli;
