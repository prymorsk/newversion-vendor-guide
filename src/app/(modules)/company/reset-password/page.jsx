
import { Suspense } from "react";
import CompanyReset from "./CompanyReset";

export const dynamic = "force-dynamic";
export const metadata = {
  title: 'Vendor Guide | Reset Password',
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <CompanyReset />
    </Suspense>
  );
}








