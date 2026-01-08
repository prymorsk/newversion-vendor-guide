import Sidecount from "@/components/Common/Sidecount";

const Sideli = ({ dashboardData }) => {
  const rows = dashboardData?.side_bar ?? [];

  return (
    <div className="col-span-3 lg:col-span-1 md:col-span-1 order-2 sm:order-1">
      <div className="sm:mt-6 lg:mt-12">
        <ul className="bg-white list-unstyled font-medium border border-[#171717]">
          {rows.map((col, i) => (
            <Sidecount
              key={`${col.name}-${i}`}
              count={col.count}
              name={col.name}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sideli;
