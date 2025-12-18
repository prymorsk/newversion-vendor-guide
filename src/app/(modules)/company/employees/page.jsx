import { Suspense } from "react";
import Employeepage from "./Employeepage";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Employeepage />
    </Suspense>
  );
}
