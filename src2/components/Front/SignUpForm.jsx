const SignUpForm = (props) => {
  return (
    <>
      <div className="md:col-span-1 col-span-12   order-1 sm:order-2  sm:gap-x-5 lg:ps-24">
        <div className=" rounded-2xl overflow-hidden  flex flex-col  bg-white">
          <div className="items-center p-3 bg-[#B13634]">
            <p className="text-center text-white font-medium lg:text-2xl text-lg md:text-2xl tracking-wide">
              {props.heading}
            </p>
          </div>
          <div className="lg:px-8 px-3 lg:pb-8 pb-3  lg:pt-5 pt-2">
            <form className="">
              <div className="grid grid-cols-12 mb-4 items-center  ">
                <div className="col-span-12 lg:col-span-12 mb-2">
                  <h3 className="md:mt-0 mt-0 md:leading-6 leading-5 md:text-[1.02rem] text-sm text-[#221F20] font-bold  font-maven">
                    Take the next step in advertising with Vendor Guide!
                  </h3>
                  <p className="md:mt-0 mt-0 md:leading-6 leading-5 md:text-[1.02rem] text-sm text-[#221F20] font-medium  font-maven">
                    Share your partnership interests through the form below and
                    we&#39;ll create a winning advertising plan that’s best for
                    you!
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-12 mb-4 items-center  ">
                <div className="col-span-12 lg:col-span-12 mb-2">
                  <select
                    name="package"
                    className="w-full border-2  border-[#171717]  py-2.5 md:text-[0.77rem] text-[0.55rem] px-2 text-[#171717] font-bold focus:border-[#171717]"
                  >
                    <option className="text-sm text-[#171717] font-bold bg-white">
                      Elite Advertising Package
                    </option>
                    <option>Large select</option>
                    <option>Small select</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-12 mb-3 items-center border-b-2 border-[#221F20]">
                <div className="col-span-12 lg:col-span-12 mb-4">
                  <div className="grid grid-cols-4 text-sm md:text-[1.09rem] text-[#B13634]  font-bold font-lato">
                    <div className="col-span-3 pb-2">
                      Elite Package x 12 Months
                    </div>
                    <div className="col-span-1 text-center">$2,688</div>
                  </div>
                  <p className="md:mt-0 mt-0 md:leading-6 leading-5 md:text-[1.02rem] text-sm text-[#221F20] font-medium  font-maven">
                    Includes Tier 1 Rank Priority, Company Logo,12 photos,
                    Request Bid, and Web Link for one year
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 items-center ">
                <div className="col-span-2">
                  <h2 className="text-right font-bold text-[#221F20] md:text-[1.08rem] text-sm">
                    Sub Total: $2,938.00
                  </h2>
                </div>
              </div>
              <h4 className="text-left text-[#221F20] md:text-lg text-sm font-semibold mb-3 -tracking-tight">
                Contact Details
              </h4>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-12 lg:col-span-12 mb-4 relative float-label-input">
                  <input
                    type="text"
                    name="fullname"
                    id="name"
                    className="appearance-none w-full   border-solid border-2 border-black  dark:text-zinc-100 p-2 text-[0.55rem] md:text-[0.77rem]"
                    placeholder=""
                    value=""
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-2 left-0 text-black pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-grey-darker font-bold  text-[0.55rem]  md:text-[0.77rem]"
                  >
                    Full Name
                  </label>
                </div>
                <div className="col-span-12 lg:col-span-12 mb-4 relative float-label-input">
                  <input
                    type="text"
                    name="companyname"
                    id="companyname"
                    className="w-full  placeholder:text-sm border-solid border-2 border-black p-2 text-[0.55rem] md:text-[0.77rem]"
                    placeholder=""
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-2 left-0 text-black pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-grey-darker font-bold text-[0.55rem] md:text-[0.77rem]"
                  >
                    Company Name
                  </label>
                </div>
                <div className="col-span-12 lg:col-span-12 mb-4 relative float-label-input">
                  <input
                    type="url"
                    name="cwebsite"
                    id="cwebsite"
                    className="w-full  placeholder:text-sm border-solid border-2 border-black  text-[0.55rem] md:text-[0.77rem] p-2"
                    placeholder=""
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-2.5 left-0 text-black pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-grey-darker font-bold  text-[0.55rem] md:text-[0.77rem]"
                  >
                    Company Website
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 lg:gap-x-7 mb-4 items-center">
                <div className="col-span-2 lg:col-span-1 mb-4 relative float-label-input">
                  <input
                    type="tel"
                    name="cphone"
                    id="cphone"
                    className="w-full  placeholder:text-sm border-solid border-2 border-black    p-2 text-[0.55rem] md:text-[0.77rem]"
                    placeholder=""
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-2.5 left-0 text-black pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-grey-darker font-bold  text-[0.55rem] md:text-[0.77rem]"
                  >
                    Phone
                  </label>
                </div>
                <div className="col-span-2 lg:col-span-1 mb-4 relative float-label-input">
                  <input
                    type="email"
                    name="cemail"
                    id="cemail"
                    className="w-full  placeholder:text-sm border-solid border-2 border-black    p-2 text-[0.55rem] md:text-[0.77rem]"
                    placeholder=""
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-2.5 left-0 text-black pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-grey-darker font-bold text-[0.55rem] md:text-[0.77rem]"
                  >
                    Email
                  </label>
                </div>
                <div className="col-span-2 lg:col-span-2  relative float-label-input">
                  <textarea
                    rows="10"
                    type="email"
                    name="cemail"
                    id="cemail"
                    className="w-full resize-none  placeholder:text-sm border-solid border-2 border-black appearance-none   p-2 text-[0.55rem] md:text-[0.77rem]"
                    placeholder=""
                  ></textarea>
                  <label
                    htmlFor="name"
                    className="absolute top-2.5 left-0 text-black pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-grey-darker font-bold text-[0.55rem] md:text-[0.77rem]"
                  >
                    Note
                  </label>
                </div>
              </div>
              <div className="block text-center">
                <buttom
                  type="submit"
                  name="save"
                  className="px-10 lg:px-6 md:px-5 py-2 text-center flex-none rounded-md bg-[#B13634] lg:text-[1.3rem] md:text-lg text-sm tracking-wide font-normal font-lato text-white shadow-sm hover:bg-[#B13634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20]"
                >
                  {props.btnTitle}
                </buttom>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
