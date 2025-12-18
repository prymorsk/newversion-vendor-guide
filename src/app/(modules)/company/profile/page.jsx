import { Suspense } from "react";
import Profilepage from "./Profilepage";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Profilepage />
    </Suspense>
  );
}
