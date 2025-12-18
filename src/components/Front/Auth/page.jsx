import Right from "@/components/Front/Login/Right";
import Left from "@/components/Front/Login/Left";

const Login = () => {
  return (
    <>

      <div className="container mx-auto overflow-hidden px-24">
        <div className="mx-auto max-w-7xl">
          <div className="lg:mx-auto  max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">

            <Left />
            <Right />

          </div>
        </div>
      </div >





    </>
  );
};

export default Login;
