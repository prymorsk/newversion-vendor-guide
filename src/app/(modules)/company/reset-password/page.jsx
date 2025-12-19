import { Suspense } from "react";

import Right from "@/components/Front/Auth/Right";
import ResetPasswordForm from "@/components/ResetPasswordForm";
export const dynamic = "force-dynamic";


const Page = () => {
  return (
    <>

     
               <Suspense fallback={null}>

               <ResetPasswordForm />
                          <Right />

              </Suspense>

            

         

    </>
  );
};

export default Page;
