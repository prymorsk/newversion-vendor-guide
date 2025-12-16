import Link  from "next/link"
import LeftSideimageItemsall from "@/components/Front/VendorguideEditlisting/LeftSideimageItemsall"
const LeftSideimageItems = (props) =>{
    return(
      <div className="py-1 sm:py-5 pt-4 lg:pt-0 lg:px-14  text-center md:text-left ">
                <div className="">
                  <div className="overflow-hidden flex flex-col">
                    <div className="grid grid-cols-4 items-center justify-center gap-3  lg:gap-5 xl:gap-6 md:gap-4">
                    <LeftSideimageItemsall/>
                    </div>
                  </div>
                </div>
              </div>
            
        
    )
}

export default LeftSideimageItems