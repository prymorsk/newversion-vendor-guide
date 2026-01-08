import Image from "next/image";
import ResourceBannerSection from "./ResourceBannerSection";

const TopBanner = ({resourceMeta}) => {
  return (
    <>
      <div className="top_banner sm:relative">
        <div
          className="relative"  
        >
          
          <div className="">
            <div className="mx-auto mt-40">
              
            </div>
          </div>
          <ResourceBannerSection title={"Explore Our Digital Magazine Editions"}/>
        </div>
      </div>
    </>
  );
};

export default TopBanner;
