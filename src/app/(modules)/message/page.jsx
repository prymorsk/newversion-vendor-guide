import { Suspense } from "react";

import TableData from "./TableData";
export const dynamic = "force-dynamic";

const Page = () => {
  return (
        <Suspense fallback={null}>

          <TableData />
         </Suspense>

  );
};

export default Page;
