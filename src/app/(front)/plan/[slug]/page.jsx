"use client";
import HeroSection from "@/components/Front/HeroSection";
import { useAuth } from "@/context/UserContext";
import Image from "next/image";
import patternImage from "@/../public/images&icons/signup/pattern1.png";
import icon1 from "@/../public/images&icons/signup/icon1.png";
import icon2 from "@/../public/images&icons/signup/icon2.png";
import icon3 from "@/../public/images&icons/signup/icon3.png";
import StripSubscriptionForm from "@/app/(front)/plan/[slug]/StripSubscriptionForm";
const Page = ({params}) => {
    const slug = params.slug;
    const {metaData,loading,user} = useAuth();
    const advertiseMeta = metaData?.advertise;
  return (
     <>
        <HeroSection bannerData={advertiseMeta}
            src={advertiseMeta?.advertise_background}
            title={advertiseMeta?.advertise_title}
        />
        <div
      id="featurs_section"
      style={{ backgroundImage: `url(${patternImage})`,backgroundSize: '100% 100%' }}
      className="py-9 md:py-5 bg-[#F6F7F8]"
    >
        {/* `background-image:url(${patternImage}); background-size: 100% 100%;` */}
      <div className="container mx-auto overflow-hidden pt-5 md:pt-12 px-5 md:px-8 xl:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="lg:mx-auto  max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16  lg:max-w-none">
            <div className="md:col-span-1 col-span-12 lg:-mr-16 order-2 sm:order-1 ">
              <div className=" lg:pt-4 text-center md:text-left ">
                <p className="lg:mt-1 md:mt-6 sm:mt-0 mt-10 lg:leading-10 md:text-[1.02rem] text-[1.02rem] lg:text-[1.45rem]  text-[#221F20] font-medium  font-maven">
                  <span className="text-xl lg:text-[1.80rem] text-[#B13634] font-bold font-lato">Ready to take your business to new heights?</span>
                  <br/>
                  <span>Join Vendor Guide's exclusive network and propel your brand
                                htmlForward. Our plathtmlForm offers you the tools and opportunities
                                you need to efhtmlFortlessly manage your listings and secure
                                valuable bid requests.</span>
                </p>
              </div>
              <div className="md:pt-10 py-10 md:py-5 lg:pt-24 text-center md:text-left ">
                <div className="grid grid-cols-4">
                  <div className="md:col-span-1 col-span-4 align-top">
                    <Image
                      src={icon1}
                      alt="Product screenshot"
                      className="mx-auto md:mx-0 md:max-w-none md:w-16 lg:w-[5rem]"
                    />
                  </div>
                  <div className="md:col-span-3 col-span-4">
                    <p className="md:mt-0 mt-6 lg:leading-10 text-[1.02rem] lg:text-[1.35rem]  text-[#221F20] font-medium  font-maven">
                      <span className="text-xl lg:text-[1.95rem] text-[#221F20]  font-bold font-lato">
                        Unparalleled Exposure
                        <br className="md:block hidden"/>
                        & Impact
                      </span>
                      <br/>
                      <span>As a member of our community, your services are showcased to a vast network of property managers actively looking to collaborate with vendors like you. Harness the power of our plathtmlForm to elevate your reach, engaging with potential clients on a whole new level.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-10 sm:py-5 pt-4 lg:pt-24 text-center md:text-left ">
                <div className="grid grid-cols-4">
                  <div className="md:col-span-1 col-span-4 align-top">
                    <Image
                      src={icon2}
                      alt="Product screenshot"
                      className="mx-auto md:mx-0 md:max-w-none md:w-16 lg:w-[5rem]"
                    />
                  </div>
                  <div className="md:col-span-3 col-span-4">
                    <p className="md:mt-0 mt-6 lg:leading-10 text-[1.02rem] lg:text-[1.35rem]  text-[#221F20] font-medium  font-maven">
                      <span className="text-xl lg:text-[1.95rem] text-[#221F20]  font-bold font-lato">
                        EfhtmlFortless Management
                        <br className="md:block hidden"/>
                        & Bid Requests
                      </span>
                      <br/>
                      <span>Through your intuitive Vendor Guide dashboard,
                                            you can easily update your inhtmlFormation and receive
                                            bid requests that matter and make meaningful
                                            connections with property managers actively
                                            seeking your services.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-10 md:py-5 pt-4 lg:pt-24 text-center md:text-left order-last lg:order-first ">
                <div className="grid grid-cols-4">
                  <div className="md:col-span-1 col-span-4 align-top">
                    <Image
                      src={icon3}
                      alt="Product screenshot"
                      className="mx-auto md:mx-0 md:max-w-none md:w-16 lg:w-[5rem]"
                    />
                  </div>
                  <div className="md:col-span-3 col-span-4">
                    <p className="md:mt-0 mt-6 lg:leading-10 text-[1.02rem] lg:text-[1.35rem]  text-[#221F20] font-medium  font-maven">
                      <span className="text-xl lg:text-[1.95rem] text-[#221F20]  font-bold font-lato">
                        Empowerment through
                        <br className="md:block hidden"/>
                        Data Insights
                      </span>
                      <br/>
                      <span>Gain a competitive edge with Vendor Guide's
                                            insights. Understand trends, preferences, and
                                            demands within your industry, enabling you to tailor
                                            your offerings effectively.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <StripSubscriptionForm currentSlug={slug} user={user} />
          </div>
        </div>
        
        <div className="relative isolate overflow-hidden pt-8 lg:pt-16 xl:pt-24">
          <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
            <div className="mx-auto  max-w-2xl grid-cols-1  lg:max-w-none lg:grid-cols-2">
              <div className="mx-auto text-center">
                <h2 className="text-lg md:text-2xl xl:text-3xl font-bold  tracking-normal text-[#221F20]  font-lato md:pb-5">
                  Don't miss this chance to
                                grow your business – get in touch with us now!
                </h2>
                <div className="py-8 lg:py-11 gap-x-4 text-center block">
                  <a
                    href="#"
                    className="px-8 sm:px-10 lg:px-16 py-3 lg:py-4 text-center flex-none rounded-md bg-[#221F20] md:text-xl text:lg tracking-wide font-medium font-lato text-white shadow-sm hover:bg-[#221F20] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20]"
                  >
                    Contact Us Today
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
     </>
    
  );
};

export default Page;


