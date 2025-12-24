'use client';
import Link from "next/link";
import Image from "next/image";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/UserContext";
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from "next/navigation";
import HeaderDropdown from "./HeaderDropdown";
import Loading from "@/app/loadingScreen";
import { Button } from "primereact/button";
import RequestQuotebtn from "@/components/Front/RequestQuotebtn";

// ✅ Public folder images should be referenced via URL
//const Logo = "/images&icons/SVG/logo.svg";


const Header = ({ categories, magazines, sitesetting }) => {
  const { user, isLoding, isInfoLoding, logout } = useAuth();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const cookie = getCookie('token');
  const pathname = usePathname();
  const UserType = getCookie('user-type');
  const [UserTypeName, setUserTypeName] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showMenu, setShowMenu] = useState(true);


const LogoMain = "/image/1700727849.png";

const Logo = sitesetting?.sidelogo_url ? sitesetting.sidelogo_url : LogoMain;

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (UserType == 1) {
      setProfileUrl('/manager/dashboard');
      setUserTypeName('Manager');
    } else if (UserType == 2) {
      setProfileUrl('/company/dashboard');
      setUserTypeName('Company');
    } else if (UserType == 0) {
      setProfileUrl('/vendor/dashboard');
      setUserTypeName('Vendor');
    }
  }, []);

  const toggleclassName = () => setIsActive(!isActive);
  const menuClick = () => setIsActive(false);
  const toggleMenu = () => setShowMenu(current => !current);
  const imagsrc = user ? user.image_url : null;

  //console.log('user.');
  //console.log(user);
  //console.log('user.');

  return (
    <>
      <header className="main-header">
        <div className="container mx-auto px-4 flex flex-row gap-4 justify-between items-center">
          <div className="header-logo">
            <Link href="/">
              <Image
                src={Logo}
                width={350}
                height={48}
                alt="logo"
              />
            </Link>
          </div>

          {/* Header menu */}

          


          <div className="header-menu">
            <ul className={`flex space-x-8 font-medium ${ Logo ? "text-white" : "text-black"}`}>
              <li className="relative group cursor-pointer flex items-center">
                <span className="flex items-center">
                  Solutions
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                       fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              <ul className="submenu absolute left-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-[400px]">
              {categories?.data
              ?.filter(row => [51, 16, 61, 44, 31].includes(row.id))
              .map(row => (
              <li key={row.id}>
              <button
              type="button"
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() =>
              window.location.assign(`/vendors?category=${row.id}`)
              }
              >
              {row.title}
              </button>
              </li>
              ))}
              </ul>

              </li>

              <li><Link href="/advertise" className="hover:text-gray-300" onClick={menuClick}>Advertise</Link></li>
              <li><Link href="/about-us" className="hover:text-gray-300" onClick={menuClick}>Company</Link></li>
              <li><Link href="/contact-us" className="hover:text-gray-300" onClick={menuClick}>Contact</Link></li>

              <li className="relative group cursor-pointer flex items-center">
                <span className="flex items-center">
                  Resources
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180"
                       fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>

                <ul className="submenu absolute left-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <li><Link href="/blog" className="block px-4 py-2 hover:bg-gray-100" onClick={menuClick}>Blog</Link></li>
                  <li className="hover:bg-gray-50/50 dark:hover:bg-zinc-700/50">
                    <div className="head_pulbication_dropdown inline-block relative pb-2 pr-8 ">
                      <button type="button" className="text-base text-[#221F20] font-semibold flex items-center dropdown-toggle dark:border-zinc-600 pl-3" id="page-header-user-dropdown2">
                        <span className="pl-1 text-sm font-bold xl:block pr-2">Publication</span>
                        <FontAwesomeIcon icon={faAngleRight} className="text-[#B13634]" />
                      </button>
                      <HeaderDropdown magazines={magazines} activemenu={menuClick}/>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Header right buttons */}
          <div className="header-right-button">
            <ul className="links-menu flex flex-row gap-4 justify-between items-center">
              {user?.name ? (
                <li>
                  <div className="head_profile_dropdown relative px-4 md:px-0 py-2 lg:py-3 border-b border-gray-100 lg:border-0">
                

<div className="dropdown relative">
                  <button
                    type="button"
                    className="flex gap-x-4 items-center px-4 py-2  border-gray-50 text-white dropdown-toggle"
                    id="page-header-user-dropdown"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={toggleMenu}
                  >
                    <Image
                      width="100"
                      height="100"
                      className="h-8 w-8 rounded-full ltr:xl:mr-2 rtl:xl:ml-2"
                      src={imagsrc ? imagsrc : userDefult}
                      alt="Header Avatar 444"
                    />
                    <div className="w-50">
                      <span className="text-left block align-middle text-white text-xs font-lato">
                        {isLoding ? (
                            <span>Loading...</span>
                        ) : user?.name } ({UserTypeName}) <FontAwesomeIcon icon={faAngleDown}  />
                      </span>
                      {/* <span className="text-white block text-xs">
                        Portfolio Manager
                      </span> */}
                    </div>
                  </button>
</div>



                    <div className="head_profile_dropdown-menu absolute top-[2rem] left-0 z-40 w-28 list-none rounded bg-white hidden shadow-solid-primary" id="profile/log">
                      <div className="border border-gray-50">
                        <div className="dropdown-item">
                          <Link className="px-3 py-2 hover:bg-gray-50/50 block custom-text-black" href={profileUrl} onClick={menuClick}>Dashboard</Link>
                        </div>
                        <hr className="border-gray-50" />
                        <div className="dropdown-item">
                          <Button className="p-3 hover:bg-gray-50/50 block" onClick={logout}>Logout</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li><Link href="/login" onClick={menuClick}>Login</Link></li>
              )}

              <li className="button ">
                {(UserType == 1 || !user) && <RequestQuotebtn user={user} categories={categories} />}
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
