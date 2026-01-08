import { Suspense } from "react";
import ManagerMessageId from "./ManagerMessageId";

export const dynamic = "force-dynamic";
export const metadata = {
  title: 'Vendor Guide | Message',
}
export default async function Page({ params :paramenawait }) {

  const datad = await paramenawait;
  return (
    <Suspense fallback={null}>
      <ManagerMessageId  params={datad} />
    </Suspense>
  );
}









