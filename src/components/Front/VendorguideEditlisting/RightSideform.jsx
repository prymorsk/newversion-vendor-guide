import Link  from "next/link"
import Input from "@/components/Common/Input"
import Editbutton from "@/components/Front/VendorguideEditlisting/Editbutton"
const RightSideform = (props) =>{
    return(
       <>
       
              <div className="overflow-hidden  flex flex-col">
                <div className="lg:pb-8 pb-3  lg:pt-5 pt-2">
                  <form className="">
                    <table className="w-full">
                      <tr>
                        <td className="pb-2 pr-4 ps-10">
                          <div className=" relative">
                            <h4 className="text-right text-[#221F20] md:text-xl text-sm font-semibold -tracking-tight">
                              Company Name
                            </h4>
                          </div>
                        </td>
                        <td className="pb-2">
                          <div className="relative mt-0">
                           
                              <Input name= "CompanyName" id="CompanyName" placeholder="Brand Star" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-2 pr-4">
                          <div className=" relative">
                            <h4 className="text-right text-[#221F20] md:text-xl text-sm font-semibold -tracking-tight">
                              Address
                            </h4>
                          </div>
                        </td>
                        <td className="pb-2">
                          <div className=" relative mt-0">
                           
                             <Input name= "fullname" id="fullname" placeholder="10550 Wayzata Blvd" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-2 pr-4">
                          <div className=" relative">
                            <h4 className="text-right text-[#221F20] md:text-xl text-sm font-semibold -tracking-tight"></h4>
                          </div>
                        </td>
                        <td className="pb-2">
                          <div className=" relative mt-0">
                            
                             <Input name= "fullname" id="fullname" placeholder="Suite D" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-2 pr-4">
                          <div className=" relative">
                            <h4 className="text-right text-[#221F20] md:text-xl text-sm font-semibold -tracking-tight">
                              City
                            </h4>
                          </div>
                        </td>
                        <td className="pb-2">
                          <div className=" relative mt-0">
                           
                            <Input name= "fullname" id="fullname" placeholder="Minnetonka" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-2 pr-4">
                          <div className=" relative">
                            <h4 className="text-right text-[#221F20] md:text-xl text-sm font-semibold -tracking-tight">
                              State
                            </h4>
                          </div>
                        </td>
                        <td className="pb-2">
                          <div className=" relative mt-0">
                            <Input name= "fullname" id="fullname" placeholder="Minnesota" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-2 pr-4">
                          <div className=" relative">
                            <h4 className="text-right text-[#221F20] md:text-xl text-sm font-semibold -tracking-tight">
                              Zip Code
                            </h4>
                          </div>
                        </td>
                        <td className="pb-2">
                          <div className=" relative mt-0">
                            <Input name= "fullname" id="fullname" placeholder="55305" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-2 pr-4">
                          <div className=" relative">
                            <h4 className="text-right text-[#221F20] md:text-xl text-sm font-semibold -tracking-tight">
                              Phone Number
                            </h4>
                          </div>
                        </td>
                        <td className="pb-2">
                          <div className=" relative mt-0">
                           <Input name= "fullname" id="fullname" placeholder="952-460-1916" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pb-2 pr-4">
                          <div className=" relative">
                            <h4 className="text-right text-[#221F20] md:text-xl text-sm font-semibold -tracking-tight">
                              Website
                            </h4>
                          </div>
                        </td>
                        <td className="pb-2">
                          <div className=" relative mt-0">
                           <Input name= "fullname" id="fullname" placeholder="https://kwikpromos.com/" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="2"
                          className="pb-2 ps-5"
                        >
                          <div className="relative">
                            <h4 className="text-left text-[#221F20] md:text-xl text-sm font-semibold -tracking-tight">
                              Company Description
                            </h4>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          colspan="2"
                          className="pb-2"
                        >
                          <textarea
                            cols="10"
                            name="fullname"
                            id="fullname"
                            className="h-56 w-full appearance-none  border-solid border border-black px-3 py-2 text-lg md:text-sm focus:outline-none focus:shadow-outline focus:border-[#221F20] placeholder:text-lg placeholder:text-black placeholder:font-normal"
                         
                            placeholder="Looking for promotional products? You’ve come to the right site! Whether you are looking for a specific item or just browsing for ideas, Kwikpromos.com is your one-stop source.We’ve got all the new and hottest items and our service is 2nd to none. Browse millions of products by item, price or rush service and let us know if you have any questions by calling 952-460-1916 or emailing us at info@kwikpromos.com"
                          ></textarea>
                        </td>
                      </tr>
                    </table>
                    <div className="pt-8 gap-x-8 flex justify-end">
                      
                    <Editbutton link="#" property="flex justify-center px-8 sm:px-10 lg:px-3" name="Preview Changes"/>
                   
                    <Editbutton link="#" property="flex justify-center px-8 sm:px-10 lg:px-3" name="Submit Listing"/>
                    </div>
                  </form>
                </div>
              </div>
       
       </>
    )
}

export default RightSideform