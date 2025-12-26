
import { Suspense } from "react";
import VendorReset from "./VendorReset";

export const dynamic = "force-dynamic";
export const metadata = {
  title: 'Vendor Guide | Reset',
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <VendorReset />
    </Suspense>
  );
}








