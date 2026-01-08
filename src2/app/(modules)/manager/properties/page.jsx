import { Suspense } from "react";
import Propertypage from "./Propertypage";

export const dynamic = "force-dynamic";
export const metadata = {
  title: 'Vendor Guide | Properties'
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <Propertypage />
    </Suspense>
  );
}
