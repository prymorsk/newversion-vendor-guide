"use client";
import Link from "next/link";
import Logo from "/public/images&icons/SVG/logo.svg";
import Image from "next/image";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = (event) => {
    setShowMenu((current) => !current);
    event.target.parentNode.nextElementSibling.classList.toggle("hidden");
  };
  return (
    <>
      <header>
        <div className="bg-[#c1272d]   px-4 lg:px-6 py-2">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xxl">
              <Link
                href=""
                className="flex items-center md:ps-4"
              >
                <Image
                  width="100"
                  height="100"
                  src=" /../../images&icons/SVG/logo_white.svg"
                  className="mr-3 h-3 sm:h-6 w-full"
                  alt=""
                />
              </Link>
              {/* <!-- profile part --> */}
              <div>
                <div className="dropdown relative">
                  <button
                    type="button"
                    className="flex gap-x-4 items-center px-4 py-2  border-gray-50 text-white dropdown-toggle"
                    id="page-header-user-dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <Image
                      width="100"
                      height="100"
                      className="h-8 w-8 rounded-full ltr:xl:mr-2 rtl:xl:ml-2"
                      src="/../../images&icons/profile.png"
                      alt="Header Avatar"
                    />
                    <div>
                      <span className="text-left block align-middle text-white text-xs font-lato">
                        Clay Brooks
                        <i className="fa fa-angle-down " aria-hidden="true"></i>
                      </span>
                      <span className="text-white block text-xs">
                        Portfolio Manager
                      </span>
                    </div>
                  </button>
                  <div
                    className="dropdown-menu absolute top-0 left-8 z-40 w-40 list-none rounded bg-white shadow hidden"
                    id="profile/log"
                    data-popper-placement=""
                  >
                    <div
                      className="border border-gray-50 "
                      aria-labelledby="navNotifications"
                    >
                      <div className="dropdown-item ">
                        <Link
                          className="px-3 py-2 hover:bg-gray-50/50 block"
                          href=""
                        >
                          <i
                            className="fa fa-user text-16 align-middle mr-1"
                            aria-hidden="true"
                          ></i>
                          Profile
                        </Link>
                      </div>
                      <div className="dropdown-item ">
                        <Link
                          className="px-3 py-2 hover:bg-gray-50/50 block"
                          href=""
                        >
                          <i
                            className="fa fa-user text-16 align-middle mr-1"
                            aria-hidden="true"
                          ></i>
                          Lock Screen
                        </Link>
                      </div>
                      <hr className="border-gray-50 " />
                      <div className="dropdown-item ">
                        <Link
                          className="p-3 hover:bg-gray-50/50 block"
                          href=""
                        >
                          <i
                            className="fa fa-sign-out text-16 align-middle mr-1"
                            aria-hidden="true"
                          ></i>
                          Logout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end profile part --> */}
            </div>
          </div>
        </div>
        <nav className="relative bg-white py-1 lg:py-0 px-4 lg:px-6 border-b border-[#171717]">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-x-5 mx-auto max-w-screen-xxl lg:ps-14">
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-[#221F20] rounded-lg md:hidden  focus:outline-none  focus:ring-gray-200"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div
                className="hidden justify-between items-center gap-x-20 w-full md:flex md:w-auto"
                id="mobile-menu-2"
              >
                <div className="">
                  <h6 className="hidden lg:block mb-1 lg:text-xl  md:text-lg font-semibold text-[#171717]">
                    Welcome to Your Vendor Management Dashboard!
                  </h6>
                </div>
                <ul className="flex flex-col gap-x-5 mt-4 font-semibold md:flex-row  md:mt-0 text-base text-[#221F20]">
                  <li>
                    <Link
                      href=""
                      className="lg:active text-base lg:text-lg text-[#221F20] font-semibold block py-1 lg:py-3 pr-4 pl-3  lg:px-3  border-b-[3px]  focus:border-red-700 hover:border-b-[3px] border-transparent active:border-b-[3px] lg:active:border-red-700"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="text-base lg:text-lg text-[#221F20] font-semibold block py-1 lg:py-3 pr-4 pl-3 lg:px-2  border-b-[3px] border-transparent focus:border-red-700 hover:border-b-[3px] hover:border-red-700 active:border-b-[3px] active:border-red-700"
                    >
                      Properties
                    </Link>
                  </li>
                  <li>
                    <Link
                      href=""
                      className="text-base lg:text-lg text-[#221F20] font-semibold block py-1 lg:py-3 pr-4 pl-3 lg:px-2  border-b-[3px] border-transparent focus:border-red-700 hover:border-b-[3px] hover:border-red-700 active:border-b-[3px] active:border-red-700"
                    >
                      Employees
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="float-right absolute lg:static top-2  lg:top-0 right-4 lg:right-0">
                <form className="app-search  block">
                  <div className="relative float-label-input-2">
                    <div className="absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none">
                      <i
                        className="fa fa-search text-sm  font-normal text-[#003041]"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <input
                      type="text"
                      id="table-search-users"
                      className="block p-[0.27rem] pl-10 text-sm text-[#171717] border border-[#003041] rounded-xl lg:w-56 bg-white focus:ring-0 "
                    />
                    <label
                      htmlFor="name"
                      className="absolute top-2 left-16 text-[#003041] pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-grey-darker font-bold  text-sm lato"
                    >
                      Search
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
