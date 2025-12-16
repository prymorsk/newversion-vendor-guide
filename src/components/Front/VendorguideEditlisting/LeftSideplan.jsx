import Image from "next/image";
import Input from "@/components/Common/Input"
import Radio from "@/components/Common/Radiobutton"
import Lable from "@/components/Common/Lable"
import Editbutton from "@/components/Front/VendorguideEditlisting/Editbutton"
const LeftSideplan = (props) =>{
    return(
        <>
       
       <div className="py-10 md:py-5 pt-4 lg:pt-24 text-center md:text-left order-last lg:order-first ">
                <div className="">
                  <p className="md:mt-0 mt-6 lg:leading-10 text-xl md:text-2xl lg:text-4xl  text-[#221F20] font-bold  font-maven">
                    Your Plan
                  </p>
                </div>
                <div className="flex gap-x-5 items-center px-10  sm:py-10 lg:py-8">
                  <div className="">
                    <h2 className="text-right font-semibold text-[#221F20] md:text-xl text-sm">
                      Elite Advertising Package
                    </h2>
                  </div>
                  <div className="pt-3 gap-x-4 text-right block">
                   
                  <Editbutton link="#" property="flex justify-center" name=" Change Plan"/>
                  </div>
                </div>
                <div className="flex gap-x-5 items-end px-10 ">
                  <div className="">
                    <h4 className="text-left font-semibold text-[#221F20] md:text-xl text-lg">
                      Payment
                    </h4>
                    <h2 className="text-left font-semibold text-[#221F20] text-base">
                      Your next bill is for
                      <span className="text-lg">$224</span>
                      + tax on
                      <span className="text-lg">9/15/2023</span>
                    </h2>
                  </div>
                  <div className="pt-3 gap-x-4 text-right block">
                    <h2 className="flex items-end text-right font-medium text-[#221F20] text-lg">
                       <Image   width="100"  height="100"
                        src="../images&icons/vender_edit_listing/paypal.png"
                        alt=""
                        className="w-16 mx-3"
                      />
                      PayPal
                    </h2>
                  </div>
                </div>
                <div className="flex gap-x-5 items-end px-10 sm:py-10 lg:py-8">
                  <div className="">
                    <h4 className="text-left font-semibold text-[#221F20] md:text-xl text-lg">
                      Update Payment Details
                    </h4>
                    <h2 className="text-left font-semibold text-[#221F20] text-base pr-[13rem]">
                      Changes to your existing subscription will be visible in your upcoming billing cycle.
                    </h2>
                  </div>
                </div>
                <div className="px-10">
                  <form action="">
                    <table className="">
                      <tr>
                        <td className="pe-4">
                          <h2 className="text-right font-semibold text-[#221F20] md:text-xl text-sm">
                            Address Line 1
                          </h2>
                        </td>
                        <td>
                          <div className="relative mt-0 mb-2 md:mb-3">
                          <Input name= "CompanyName" id="CompanyName" placeholder="" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pe-4">
                          <h2 className="text-right font-semibold text-[#221F20] md:text-xl text-sm">
                            Address Line 2
                          </h2>
                        </td>
                        <td>
                          <div className="relative mt-0 mb-2 md:mb-3">
                            <Input name= "CompanyName" id="CompanyName" placeholder="" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pe-4">
                          <h2 className="text-right font-semibold text-[#221F20] md:text-xl text-sm">
                            City
                          </h2>
                        </td>
                        <td>
                          <div className="relative mt-0 mb-2 md:mb-3">
                          <Input name= "CompanyName" id="CompanyName" placeholder="" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pe-4">
                          <h2 className="text-right font-semibold text-[#221F20] md:text-xl text-sm">
                            State
                          </h2>
                        </td>
                        <td>
                          <div className="relative mt-0 mb-2 md:mb-3">
                          <Input name= "CompanyName" id="CompanyName" placeholder="" value=""/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="pe-4">
                          <h2 className="text-right font-semibold text-[#221F20] md:text-xl text-sm">
                            Zip Code
                          </h2>
                        </td>
                        <td>
                          <div className="relative mt-0 mb-2 md:mb-3">
                          <Input name= "CompanyName" id="CompanyName" placeholder="" value=""/>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div className="lg:ps-32 flex gap-x-3 items-center my-6 mb-4">
                    <Radio name="default-radio-1" id="default-radio-1"/>
                      <label
                        htmlFor="default-radio-1"
                        className=" font-semibold text-[#221F20] md:text-xl text-sm "
                      >Credit or debit card</label>
                    </div>
                    <div className="lg:ps-32 flex gap-x-3 items-center mb-5">
                    <Radio name="default-radio-1" id="default-radio-1"/>
                      <label
                        htmlFor="default-radio-1"
                        className="flex items-center font-semibold text-[#221F20] md:text-xl text-sm "
                      >
                         <Image   width="100"  height="100"
                          src="../images&icons/vender_edit_listing/paypal.png"
                          alt=""
                          className="w-16 me-3"
                        />
                        PayPal
                      </label>
                    </div>
                    <div className="float-right pe-24">
                      <h4 className="text-left text-[#171717] md:text-lg text-sm font-semibold mb-3 -tracking-tight">
                        Payment Method
                      </h4>
                      <div className="mb-4 items-center ">
                        <div className="mb-4 relative float-label-input mt-0">
                         
                             <Input name= "cardno" id="cardno" placeholder="" value=""/>
                             <Lable lable= "Credit Card Number" htmlFor="cardno" />
                         
                        </div>
                        <div className="">
                          <div className="flex lg:gap-x-7 gap-x-2 mb-2 items-center ">
                            <div className="col-span-1 lg:col-span-1 mb-4 relative float-label-input mt-0">
                              
                                <Input name= "carddate" id="carddate" placeholder="" value=""/>
                                <Lable lable= "Exp. Date" htmlFor="name" />
                            </div>
                            <div className="col-span-1 lg:col-span-1 mb-4 relative float-label-input mt-0">
                             
                                <Input name= "cardyear" id="cardyear" placeholder="" value=""/>
                                <Lable lable= "Year" htmlFor="name" />
                            </div>
                            <div className="col-span-1 lg:col-span-1 mb-4 relative float-label-input mt-0">
                            
                                 <Input name= "secretcode" id="secretcode" placeholder="" value=""/>
                                 <Lable lable= "CVV" htmlFor="name" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right pt-1 gap-x-8">
                     
                      <Editbutton link="#" property="inline-block" name="Update"/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            
        </>
    )
}

export default LeftSideplan