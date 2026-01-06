import { Suspense } from "react";
import Profilepage from "./Profilepage";

export const dynamic = "force-dynamic";
export const metadata = {
    title: 'Vendor Guide | Company Profile'
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <Profilepage />
    </Suspense>
  );
}
