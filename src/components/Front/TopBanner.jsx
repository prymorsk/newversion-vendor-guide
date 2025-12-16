import Image from "next/image";
import ResourceBannerSection from "./ResourceBannerSection";

const TopBanner = ({resourceMeta}) => {
  return (
    <>
      <div className="top_banner sm:relative">
        <div
          className="relative h-[40vh] sm:h-[60vh] md:h-[72vh] lg:h-[80vh] xl:h-[83vh] 2xl-h-[83vh] bg-cover bg-no-repeat  before:content[''] before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:bg-[#0000007d] before:h-[40vh] before:sm:h-[60vh]  before:md:h-[72vh] before:lg:h-[80vh] before:xl:h-[83vh] 2xl-h-[83vh] bg:opacity-25"  
        >
          <Image
              src={resourceMeta.resources_background}
              alt="Product screenshot"
              className="mx-auto max-w-none h-[40vh] sm:h-[60vh] md:h-[72vh] lg:h-[80vh] xl:h-[83vh] 2xl-h-[83vh] object-cover w-full"
              width="100"
              height="100"
            />
          <div className="isolate absolute top-0 left-0 right-0 px-6 pt-16 sm:pt-24 md:pt-16  lg:px-8  xl:pt-18 2xl:pt-[7rem]">
            <div className="mx-auto max-w-2xl lg:py-32 md:pt-10 sm:pb-48 lg:pt-20 xl:pt-20">
              <div className="text-center ">
                <h1 className="lg:text-5xl text-3xl font-bold tracking-tight text-gray-50 md:text-4xl">
                  {resourceMeta?.resources_title}
                </h1>
                <p className="lg:mt-5 mt-3 lg:text-xl text-sm leading-5 text-gray-50">
                  {resourceMeta?.resources_text}
                </p>
              </div>
            </div>
          </div>
          <ResourceBannerSection title={"Explore Our Digital Magazine Editions"}/>
        </div>
      </div>
    </>
  );
};

export default TopBanner;
