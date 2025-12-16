const DetailsForm = (props) => {
  return (
    <>
    <div className="mt-5 mx-10">
    <div className="">
      <h2 className="text-[2.5rem] font-bold leading-7 text-[#c13e27] text-center py-8">
        Send Us an Inquiry <i className="fa fa-angle-right" aria-hidden="true"></i>
      </h2>
      <div className="text-[#f55] font-semibold text-lg font-lato my-10">
        <p className="">
          "<span className="">*</span>" indicates required fields
        </p>
      </div>
    </div>
    <form>
      <div className="space-y-2">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
              <span className="text-[#c13e27] ps-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                placeholder="Name*"
                className="bg-[#f5f5f5] block w-full rounded-md border-0  px-4 py-3 text-sm text-gray-900 font-semibold shadow-sm   placeholder:text-[#909caa] placeholder:text-base placeholder:font-semibold focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="address"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Street Address
              <span className="text-[#c13e27] ps-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="address"
                id="address"
                autoComplete="given-name"
                placeholder="Street Address*"
                className="bg-[#f5f5f5] block w-full rounded-md border-0  px-4 py-3 text-sm text-gray-900 font-semibold shadow-sm   placeholder:text-[#909caa] placeholder:text-base placeholder:font-semibold focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="Companyname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Company Name
              <span className="text-[#c13e27] ps-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="Companyname"
                id="Companyname"
                autoComplete="given-name"
                placeholder="Company Name*"
                className="bg-[#f5f5f5] block w-full rounded-md border-0  px-4 py-3 text-sm text-gray-900 font-semibold shadow-sm   placeholder:text-[#909caa] placeholder:text-base placeholder:font-semibold focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="city"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              City
              <span className="text-[#c13e27] ps-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="city"
                id="city"
                autoComplete="given-name"
                placeholder="City*"
                className="bg-[#f5f5f5] block w-full rounded-md border-0  px-4 py-3 text-sm text-gray-900 font-semibold shadow-sm   placeholder:text-[#909caa] placeholder:text-base placeholder:font-semibold focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
              <span className="text-[#c13e27] ps-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="given-name"
                placeholder="Email*"
                className="bg-[#f5f5f5] block w-full rounded-md border-0  px-3 py-3 text-sm text-gray-900 font-semibold shadow-sm   placeholder:text-[#909caa] placeholder:text-base placeholder:font-semibold focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Country
              <span className="text-[#c13e27] ps-1">*</span>
            </label>
            <div className="mt-2">
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                className="bg-[#f5f5f5] block w-full rounded-md border-0  px-4 py-3 text-sm text-[#c13e27] font-semibold shadow-sm   placeholder:text-[#909caa] placeholder:text-base placeholder:font-semibold focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="phone"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone
              <span className="text-[#c13e27] ps-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="phone"
                id="phone"
                autoComplete="given-name"
                placeholder="Phone*"
                className="bg-[#f5f5f5] block w-full rounded-md border-0  px-4 py-3 text-gray-900 shadow-sm   placeholder:text-[#909caa] placeholder:text-base placeholder:font-semibold focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="zipcode"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Zip
              <span className="text-[#c13e27] ps-1">*</span>
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                autoComplete="given-name"
                placeholder="Zip*"
                className="focus:ring-transparent bg-[#f5f5f5] block w-full rounded-md border-0  px-4 py-3 text-gray-900 shadow-sm   placeholder:text-[#909caa] placeholder:text-base placeholder:font-semibold sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 ">
          <h3 className="text-xl font-bold leading-7 text-[#c13e27] text-left my-4">
            Tell us about your project.
          </h3>
          <div className="">
            <h3 className="text-base font-semibold leading-7 text-gray-900 text-left my-4">
              Tell us about your project.
            </h3>
            <textarea
              name="selfinfo"
              id="selfinfo"
              className="bg-[#f5f5f5] block w-full rounded-md border-0  px-4 py-3 text-gray-900 shadow-sm   placeholder:text-[#909caa] placeholder:text-base placeholder:font-semibold focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="What can we help you with?*"
              aria-required="true"
              aria-invalid="false"
              rows="8"
              cols="40"
            ></textarea>
          </div>
        </div>
        <div className="block text-left pt-5 py-10">
          <button
            type="submit"
            className="px-10 lg:px-12 md:px-10 py-4 text-center inline-block rounded-lg bg-[#c13e27] lg:text-base md:text-base text-sm tracking-wide font-semibold font-lato text-white shadow-sm hover:bg-[#783426] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20] mr-4"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </form>
  </div>
    </>
  );
};

export default DetailsForm;
