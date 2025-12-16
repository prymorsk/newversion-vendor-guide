import Image from "next/image";
const RightSide = (props) =>{
    return(
        <div className="col-span-2 md:col-span-1">
          <div className="text-base leading-5 font-semibold text-[#171717] text-right pb-4 pr-3">
            <p>(952) 746-5343</p>
            <p className=""> manager@solsticesprings.com</p>
            <p className="">hello@solsticesprings.com</p>
          </div>
          <div className="">
             <Image   width="100"  height="100"
              src="/../../images&icons/dashboard/image2.png"
              alt=""
              className="w-[30rem] h-75 float-right mx-auto"
            />
          </div>
          
        </div>
    )
}

export default RightSide