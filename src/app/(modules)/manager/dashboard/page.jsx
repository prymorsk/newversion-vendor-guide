
import { Suspense } from "react";
import ManagerDashboard from "./ManagerDashboard";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ManagerDashboard />
    </Suspense>
  );
}








