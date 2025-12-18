
import { Suspense } from "react";
import CompanyDashboard from "./CompanyDashboard";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CompanyDashboard />
    </Suspense>
  );
}








