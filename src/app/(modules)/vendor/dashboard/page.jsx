
import { Suspense } from "react";
import VendorDashboard from "./VendorDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: 'Vendor Guide | Dashboard'
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <VendorDashboard />
    </Suspense>
  );
}








