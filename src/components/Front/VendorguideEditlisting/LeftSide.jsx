import LeftSideimageItems from "@/components/Front/VendorguideEditlisting/LeftSideimageItems";
// import LeftSideplan from "@/components/Front/VendorguideEditlisting/LeftSideplan";
import LeftSidebanner from "@/components/Front/VendorguideEditlisting/LeftSidebanner";
const LeftSide = (props) => {
  return (
    <>
      <div className=" lg:pt-4 text-center md:text-left">
        <p className="lg:mt-1 md:mt-6 sm:mt-0 mt-10 lg:leading-10 md:text-[1.02rem] text-[1.02rem] lg:text-4xl  text-[#221F20] font-semibold  font-maven">
          Edit Company Listing
        </p>
      </div>
      <LeftSidebanner />
      <LeftSideimageItems />
      {/* <LeftSideplan/> */}
    </>
  );
};

export default LeftSide;
