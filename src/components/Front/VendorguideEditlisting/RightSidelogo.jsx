import Editbutton from "@/components/Front/VendorguideEditlisting/Editbutton"
import Image from "next/image";
const RightSidelogo = (props) =>{
    return(
       <>
       <div className="text-center pb-6">
                <div className="">
                   <Image   width="100"  height="100"
                    src="/../images&icons/vender_edit_listing/brandstar.jpg"
                    alt="Product screenshot"
                    className="mx-auto w-[26rem] px-6"
                  />
                </div>
                <div className="py-8 px-16 lg:py-7 gap-x-4 block">
                
                <Editbutton link="#" property="inline-block lg:px-28" name=" Upload New Logo"/>
                </div>
              </div>
             
       
       </>
    )
}

export default RightSidelogo