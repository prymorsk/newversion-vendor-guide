import { Suspense } from "react";
import CompanyProperty from "./CompanyProperty";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vendor Guide | Property",
};

export default async function Page({ params :paramenawait }) {
  // Example: fetch some data if needed
   const datad = await paramenawait;

  console.log("params:", datad); // { id: "258" }

  return (
    <Suspense fallback={null}>
      <CompanyProperty params={datad} />
    </Suspense>
  );
}
