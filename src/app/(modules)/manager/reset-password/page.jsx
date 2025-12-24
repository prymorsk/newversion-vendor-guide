
import { Suspense } from "react";
import ManagerReset from "./ManagerReset";

export const dynamic = "force-dynamic";
export const metadata = {
  title: 'Vendor Guide | Sign UP',
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <ManagerReset />
    </Suspense>
  );
}








