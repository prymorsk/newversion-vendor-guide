
import { Suspense } from "react";
import ManagerDashboard from "./ManagerDashboard";

export const dynamic = "force-dynamic";
export const metadata = {
  title: 'Vendor Guide | Dashboard'
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <ManagerDashboard />
    </Suspense>
  );
}








