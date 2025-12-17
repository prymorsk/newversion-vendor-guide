"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "@/context/UserContext";
import { getCookie } from "cookies-next";
import RequestQuotebtn from "@/components/Front/RequestQuotebtn";

const Header = ({ activeTab, setActiveTab, categories, sitesetting }) => {
  const { user, isLoding, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tabList, setTabList] = useState([]);
  const [UserTypeName, setUserTypeName] = useState("");

  const UserType = getCookie("user-type");

  // Images from public folder
  const whiteLogo = "/images&icons/SVG/logo_white.svg";
  const userDefault = "/images&icons/profile.png";

  // Setup tabs based on user type
  useEffect(() => {
    if (UserType === "1") {
      setUserTypeName("Manager");
      setTabList([
        { tab: "dashboard", label: "Dashboard", url: "/manager/dashboard" },
        { tab: "properties", label: "Properties", url: "/manager/properties" },
        { tab: "profile", label: "Profile", url: "/manager/profile" },
      ]);
    } else if (UserType === "2") {
      setUserTypeName("Company");
      setTabList([
        { tab: "dashboard", label: "Dashboard", url: "/company/dashboard" },
        { tab: "properties", label: "Properties", url: "/company/properties" },
        { tab: "employees", label: "Employees", url: "/company/employees" },
        { tab: "profile", label: "Profile", url: "/company/profile" },
      ]);
    } else if (UserType === "0") {
      setUserTypeName("Vendor");
      setTabList([
        { tab: "dashboard", label: "Dashboard", url: "/vendor/dashboard" },
        { tab: "profile", label: "Profile", url: "/vendor/profile" },
      ]);
    }
  }, [UserType]);

  // Toggle dropdown menu
  const toggleMenu = () => setShowMenu(!showMenu);

  // Close dropdown
  const closeMenu = () => setShowMenu(false);

  // Handle active tab
  const handleTabActive = (tab) => setActiveTab(tab);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-[#c1272d] px-4 lg:px-6 py-2">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              width={100}
              height={100}
              src={whiteLogo}
              alt="Vendor Guide"
              className="h-6 w-auto"
            />
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-2 text-white"
              onClick={toggleMenu}
            >
              <Image
                width={100}
                height={100}
                src={user?.image_url || userDefault}
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-xs font-lato">
                {isLoding ? "Loading..." : user?.name} ({UserTypeName})
              </span>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 ${
                showMenu ? "" : "hidden"
              }`}
            >
              <Link
                href="profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={closeMenu}
              >
                Profile
              </Link>
              <Link
                href="reset-password"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={closeMenu}
              >
                Change Password
              </Link>
              <hr />
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white border-b border-[#171717] px-4 lg:px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#221F20]"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <span>&#10005;</span> // Close icon
            ) : (
              <span>&#9776;</span> // Hamburger icon
            )}
          </button>

          {/* Tabs */}
          <ul
            className={`flex flex-col md:flex-row gap-4 md:gap-6 mt-2 md:mt-0 ${
              isMobileMenuOpen ? "flex" : "hidden md:flex"
            }`}
          >
            {tabList.map((row) => (
              <li key={row.tab}>
                <Link
                  href={row.url}
                  className={`block py-2 px-3 text-[#221F20] font-semibold border-b-3 ${
                    row.tab === activeTab
                      ? "border-b-3 border-red-700"
                      : "border-transparent"
                  }`}
                  onClick={() => handleTabActive(row.tab)}
                >
                  {row.label}
                </Link>
              </li>
            ))}

            {/* Request Quote Button */}
            <li>
              {(UserType === "1" || !user) && (
                <RequestQuotebtn user={user} categories={categories} />
              )}
            </li>
          </ul>

          {/* Search */}
          <div className="hidden lg:block">
            <form className="relative">
              <input
                type="text"
                className="pl-10 pr-3 py-1 border border-[#003041] rounded-xl text-sm focus:outline-none"
                placeholder="Search"
              />
              <i className="fa fa-search absolute left-3 top-1.5 text-[#003041]"></i>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
