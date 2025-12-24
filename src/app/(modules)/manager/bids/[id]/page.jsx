import { Suspense } from "react";
import ManagerBids from "./ManagerBids";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vendor Guide | Bids",
};

export default async function Page({ params :paramenawait }) {
  // Example: fetch some data if needed
   const datad = await paramenawait;

  console.log("params:", datad); // { id: "258" }

  return (
    <Suspense fallback={null}>
      <ManagerBids bidId={datad.id} />
    </Suspense>
  );
}
