"use client";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import TableCheckbox from "@/components/Front/Company/TableCheckbox";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Front/UI/Button";
import { useAuth } from "@/context/UserContext";
import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";

const ResetPasswordForm = () => {
  const [resetpasswordData, setResetPasswordData] = useState({});
  const token = getCookie("token");
  const [tokendata, settokenData] = useState(token);

  const { resetpassword, isLoding } = useAuth();

  const makeRequest = (e) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    resetpassword(formData);
  };

  return (
    <>
      <section id="hero_section" className="inner hero-section commonpage">
        {/* Hero Section */}
      </section>

      <section className="innerpage-wapper-sections">
        <div className="container mx-auto">
          <div className="infobox-details w-full mx-auto bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
            <div id="featurs_section" className="py-9 md:py-5">
              <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato lg:px-10">
                Change Password
              </h1>

              <div className="md:col-span-2 lg:col-span-1 col-span-12 lg:-mr-16 order-2 sm:order-1">
                <div className="container mx-auto overflow-hidden p-12 md:pt-12 px-12 md:px-12 xl:px-12">
                  <div className="">
                    <div
                      className="absolute inset-x-0 top-[-10rem] -z-10 transhtmlForm-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                      aria-hidden="true"
                    ></div>

                    <form
                      action="#"
                      method="POST"
                      id="password_change"
                      className="mx-auto mt-6"
                      onSubmit={makeRequest}
                    >
                      <Input
                        type="hidden"
                        name="token"
                        id="token"
                        value={tokendata}
                      />

                      <div className="">
                        <div className="w-full my-2 pb-4">
                          <Label label="Old Password" required="required" />
                          <div className="mt-2.5">
                            <Input
                              type="password"
                              name="old_password"
                              id="password"
                              value={resetpasswordData.old_password || ""}
                              onChange={(e) => {
                                var value = e.target.value;
                                setResetPasswordData({
                                  ...resetpasswordData,
                                  old_password: value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="w-full my-2 pb-4">
                          <Label label="New Password" required="required" />
                          <div className="mt-2.5">
                            <Input
                              type="password"
                              name="new_password"
                              id="password"
                              value={resetpasswordData.new_password || ""}
                              onChange={(e) => {
                                var value = e.target.value;
                                setResetPasswordData({
                                  ...resetpasswordData,
                                  new_password: value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="w-full my-2 pb-4">
                          <Label label="Confirm Password" required="required" />
                          <div className="mt-2.5">
                            <Input
                              type="password"
                              name="confirm_password"
                              id="password"
                              value={
                                resetpasswordData.confirm_password || ""
                              }
                              onChange={(e) => {
                                var value = e.target.value;
                                setResetPasswordData({
                                  ...resetpasswordData,
                                  confirm_password: value,
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className="my-4 pb-4 submit_button">
                          <Button
                            type="Submit"
                            className="block sm:w-auto w-full rounded-md bg-[#c13e27] px-10 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            is_loding={isLoding}
                            disabled={isLoding}
                          />
                        </div>
                      </div>

                      <div className="mt-2 mb-8"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordForm;
