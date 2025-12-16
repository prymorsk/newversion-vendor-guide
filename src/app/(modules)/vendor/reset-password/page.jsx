import Right from "@/components/Front/Auth/Right";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata = {
  title: 'Vendor Guide | Sign UP',
}

const Page = () => {
  return (
    <>
      <div className="container mx-auto overflow-hidden xl:px-24 lg:px-8 md:px-12 ">
        <div className="mx-auto max-w-7xl">
          <div className="lg:mx-auto  max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">
            <ResetPasswordForm />
            <Right />
          </div>
        </div>
      </div >





    </>
  );
};

export default Page;
