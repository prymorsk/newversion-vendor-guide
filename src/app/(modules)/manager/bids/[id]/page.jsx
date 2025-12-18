import TableData from "./TableData";

const Page = ({ params }) => {
  const id = params.id;
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
