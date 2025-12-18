import { Suspense } from "react";

import Right from "@/components/Front/Auth/Right";
import ResetPasswordForm from "@/components/ResetPasswordForm";
export const dynamic = "force-dynamic";


const Page = () => {
  return (
    <>

      <div className="container mx-auto overflow-hidden xl:px-24 lg:px-8 md:px-12 ">
        <div className="mx-auto max-w-7xl">
          <div className="lg:mx-auto  max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">
               <Suspense fallback={null}>

            <ResetPasswordForm />
                </Suspense>

            <Right />

          </div>
        </div>
      </div >





    </>
  );
};

export default Page;
