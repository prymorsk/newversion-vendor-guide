"use client"
import Editbutton from "@/components/Front/VendorguideEditlisting/Editbutton"
import Image from "next/image";
import { useEffect, useState } from "react"

const LeftSideimageItemsall = (props) =>{

  const [vendorData,setVendorData] = useState([
  
    {
        img:"/../images&icons/vender_edit_listing/img1.jpg",


    },
    {
        img:"/../images&icons/vender_edit_listing/img2.jpg",
       
      

    },
    {
        img:"/../images&icons/vender_edit_listing/img3.jpg",
       
       

    },
    {
        img:"/../images&icons/vender_edit_listing/img4.jpg",
       

    }
]) 



    return(
     
                    <>
                    {   vendorData.map((row,index) => {
            return(
              <>
                      <div className="">
                        <div className="sm:mt-0 flex justify-center md:justify-end">
                           <Image   width="100"  height="100"
                           src={row.img}
                            alt=""
                            className="w-full h-28"
                          />
                        </div>
                        <div className="pt-3 gap-x-4 text-right block">
                        <Editbutton link="#" property="flex justify-center" name="Edit"/>
                        </div>
                      </div>
                     
                      </>
                   )
                  })
              }
              </>
            
        
    )
}

export default LeftSideimageItemsall