import Link from "next/link";

const PartnerSection2 = (props) => {
  return (
    <>
      <div className="partner_section relative isolate overflow-hidden pt-5 lg:pt-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  max-w-2xl grid-cols-1  lg:max-w-none lg:grid-cols-2">
            <div className="mx-auto text-center">
              <h3 className="text-lg lg:text-3xl md:text-xl font-bold  tracking-normal text-[#221F20]  font-lato md:pb-5">
                {props.title}
              </h3>
              <div className="py-11 md:pb-20 gap-x-4 text-center block">
                <Link
                  href="/contact-us"
                  className="px-10 md:px-16 py-3 text-center flex-none rounded-md bg-[#221F20] md:text-xl sm:text-lg text-sm tracking-wide font-medium font-lato text-white shadow-sm hover:bg-[#221F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20]"
                >
                  {props.btnTitle}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerSection2;
