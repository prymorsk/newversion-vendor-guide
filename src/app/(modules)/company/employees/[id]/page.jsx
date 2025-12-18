import { Suspense } from "react";
import EmployeeDetailsClient from "./EmployeeDetailsClient";

export const dynamic = "force-dynamic";

export default function Page({ params }) {
  return (
    <Suspense fallback={null}>
      <EmployeeDetailsClient id={params.id} />
    </Suspense>
  );
}
