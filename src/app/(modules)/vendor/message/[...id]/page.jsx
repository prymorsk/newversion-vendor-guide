import { Suspense } from "react";
import VendorMessageId from "./VendorMessageId";

export const dynamic = "force-dynamic";
export const metadata = {
  title: 'Vendor Guide | Message',
}
export default async function Page({ params :paramenawait }) {

  const datad = await paramenawait;
  return (
    <Suspense fallback={null}>
      <VendorMessageId  params={datad} />
    </Suspense>
  );
}









