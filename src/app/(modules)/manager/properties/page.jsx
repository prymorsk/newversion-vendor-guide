import { Suspense } from "react";
import Propertypage from "./Propertypage";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Propertypage />
    </Suspense>
  );
}
