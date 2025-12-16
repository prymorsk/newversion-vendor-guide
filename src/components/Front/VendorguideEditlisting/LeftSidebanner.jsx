import Link  from "next/link"
import Editbutton from "@/components/Front/VendorguideEditlisting/Editbutton"
import Image from "next/image";
const LeftSidebanner = (props) =>{
    return(
        <>
        <div className="md:pt-10 py-10 md:py-5 lg:pt-8 text-center md:text-left">
                <div className="">
                   <Image   width="100"  height="100"
                    src="/../images&icons/vender_edit_listing/sportbanner.jpg"
                    alt="Product screenshot"
                    className="mx-auto md:mx-0  md:w-16 lg:w-[50rem]"
                  />
                </div>
                <div className="py-8 lg:py-4 gap-x-4 text-right block">
                  
                  <Editbutton link="#" propert="inline-block" name="Edit"/>
                </div>
              </div>
            
              
        </>
    )
}

export default LeftSidebanner