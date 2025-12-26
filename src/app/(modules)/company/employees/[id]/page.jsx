import { Suspense } from "react";
import EmployeeDetailsClient from "./EmployeeDetailsClient";

export const dynamic = "force-dynamic";

export default async function Page({ params: paramawait }) {
  const empdata = await paramawait;

   console.log('emp id');
   console.log(empdata);
   console.log('emp id end');



  return (
    <Suspense fallback={null}>
      <EmployeeDetailsClient params={empdata} />
    </Suspense>
  );
}
