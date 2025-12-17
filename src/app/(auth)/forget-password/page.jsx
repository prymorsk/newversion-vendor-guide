import { Suspense } from "react";
import Right from "@/components/Front/Auth/Right";
// import LoginForm from "./LoginForm";
import ForgetPasswordForm from "./ForgetPasswordForm";



const Page = () => {
  return (
    <>
      <section className="inner hero-section commonpage">
        <div className="container mx-auto px-4 flex flex-row gap-4 items-center"></div>
      </section>

      <section className="innerpage-wapper-sections">
        <div className="container mx-auto">
          <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 flex-col lg:flex-row gap-10 bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
            <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato lg:px-10">
              Forget Password
            </h1>

            <div className="container mx-auto overflow-hidden xl:px-24 lg:px-8 md:px-12">
              <div className="mx-auto max-w-7xl">
                <div className="lg:mx-auto max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">

                  {/* ✅ Suspense added (no tags removed) */}
                  <Suspense fallback={<div>Loading...</div>}>
                    <ForgetPasswordForm />
                  </Suspense>

                  <Right />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
