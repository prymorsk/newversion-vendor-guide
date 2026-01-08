import Image from "next/image";
const ImageANDText = (props) => {
  return (
    <>
      <div className="md:pt-10 py-10 md:py-5 lg:pt-24 text-center md:text-left ">
        <div className="grid grid-cols-4">
          <div className="md:col-span-1 col-span-4 align-top">
            <Image
              src={props.src}
              alt="Product screenshot"
              className="mx-auto md:mx-0 md:max-w-none md:w-16 lg:w-[5rem]"
              width="100"
              height="100"
            />
          </div>
          <div className="md:col-span-3 col-span-4">
            <p className="md:mt-0 mt-6 lg:leading-10 text-[1.02rem] lg:text-[1.35rem]  text-[#221F20] font-medium  font-maven">
              {props.title}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageANDText;
