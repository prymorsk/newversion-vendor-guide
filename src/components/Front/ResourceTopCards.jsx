import Image from "next/image";
const ResourceTopCards = (props) => {
  return (
    <>
      <div className="rounded overflow-hidden shadow-resources-primary  flex flex-col  bg-white">
        <div className="flex items-center p-3 bg-[#B13634]"></div>
        <a href="#">
          <Image
            width="100"
            height="100"
            className="w-full"
            src={props.img}
            alt="Sunset in the mountains"
          />
        </a>
        <div className="lg:px-8 px-3 lg:pb-8 pb-3  lg:pt-5 pt-2">
          <div className=" flex items-center justify-between gap-x-6">
            <a
              href="#"
              className="rounded-md bg-[#B13634] px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-[#B13634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {props.buttonTitle}
            </a>
            <a
              href="#"
              className="lg:text-sm text-xs font-semibold lg:leading-6 leading-2 text-gray-900"
            >
              {props.date}
            </a>
          </div>
          <div className="pt-3">
            <a
              href="#"
              className=" lg:text-xl md-text-lg text-sm hover:text-[#B13634] transition duration-500 ease-in-out inline-block mb-2"
            >
              <span className="text-[#B13634] font-bold">
                {props.firstTitle}
              </span>{" "}
              <span className="text-[#221F20] font-medium">
                {props.secondTitle}
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceTopCards;
