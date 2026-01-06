import { Suspense } from "react";
import Planpage from "./Planpage";
export const dynamic = "force-dynamic";

export default async function Page({ params :paramsawait }) {
  const paramsawaitm = await paramsawait; // comes from folder name [bid]
 const slugurl=paramsawaitm.slug;


  return (

    <Suspense fallback={null}>
        <Planpage slugname={slugurl}  />
    </Suspense>

    
  );
}
