import TableData from "./TableData";

const Page = ({ params }) => {
  const id = params.bid;
//   console.log(id)
  return (
    <section className="pt-14">
    <div className="px-10">
        <TableData bidId={id}  />
    </div>
  </section>
  );
};

export default Page;
