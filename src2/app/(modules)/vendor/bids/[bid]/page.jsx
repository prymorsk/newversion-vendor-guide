import { Suspense } from "react";

import VendorBids from "./VendorBids";

export const dynamic = "force-dynamic";

export const metadata = {
  title: 'Vendor Guide | Bids',
}
export default async function Page({ params :paramsawait }) {
  const paramsawaitm = await paramsawait; // comes from folder name [bid]
 const id=paramsawaitm.bid;
   console.log("params:");
    console.log(paramsawaitm);


  return (

    <Suspense fallback={null}>
        <VendorBids bidId={id} />
    </Suspense>

    
  );
}
