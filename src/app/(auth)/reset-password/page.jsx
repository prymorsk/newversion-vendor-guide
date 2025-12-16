import Right from "@/components/Front/Auth/Right";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: 'Vendor Guide | Sign UP',
}

const Page = () => {
  return (
    <>

<section className="inner hero-section commonpage">
        <div className="container mx-auto px-4 flex flex-row gap-4 items-center">
          <div className="hero-content">
            <h1><strong>Forget Password</strong></h1>
         
          </div>
        </div>
      </section>

 <section className="innerpage-wapper-sections">
        <div className="container mx-auto">
          <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 flex flex-col lg:flex-row gap-10">

    

      <div className="container mx-auto overflow-hidden xl:px-24 lg:px-8 md:px-12 ">
        <div className="mx-auto max-w-7xl">
          <div className="lg:mx-auto  max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">

            <ResetPasswordForm  />
            <Right />

          </div>
        </div>
      </div >

 </div>
        </div>
      </section >




    </>
  );
};

export default Page;
