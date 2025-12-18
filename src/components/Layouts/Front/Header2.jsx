"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "cookies-next";

import { useAuth } from "@/context/UserContext";
import RequestQuotebtn from "@/components/Front/RequestQuotebtn";

const Header = ({ activeTab, setActiveTab, categories }) => {
  const { user, isLoding, logout } = useAuth();

  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [tabList, setTabList] = useState([]);
  const [userTypeName, setUserTypeName] = useState("");
  const [userType, setUserType] = useState(null);

  const whiteLogo = "/images&icons/SVG/logo_white.svg";
  const userDefault = "/images&icons/profile.png";

  // Read cookie safely on client
  useEffect(() => {
    setUserType(getCookie("user-type"));
  }, []);

  // Setup tabs based on user type
  useEffect(() => {
    if (!userType) return;

    if (userType === "1") {
      setUserTypeName("Manager");
      setTabList([
        { tab: "dashboard", label: "Dashboard", url: "/manager/dashboard" },
        { tab: "properties", label: "Properties", url: "/manager/properties" },
        { tab: "profile", label: "Profile", url: "/manager/profile" },
      ]);
    } else if (userType === "2") {
      setUserTypeName("Company");
      setTabList([
        { tab: "dashboard", label: "Dashboard", url: "/company/dashboard" },
        { tab: "properties", label: "Properties", url: "/company/properties" },
        { tab: "employees", label: "Employees", url: "/company/employees" },
        { tab: "profile", label: "Profile", url: "/company/profile" },
      ]);
    } else if (userType === "0") {
      setUserTypeName("Vendor");
      setTabList([
        { tab: "dashboard", label: "Dashboard", url: "/vendor/dashboard" },
        { tab: "profile", label: "Profile", url: "/vendor/profile" },
      ]);
    }
  }, [userType]);

  return (
    <header>
      {/* Top Bar */}
      <div className="bg-[#c1272d] px-4 lg:px-6 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src={whiteLogo} alt="Vendor Guide" width={100} height={100} className="h-6 w-auto" />
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 text-white"
            >
              <Image
                src={user?.image_url || userDefault}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xs">
                {isLoding ? "Loading..." : user?.name} ({userTypeName})
              </span>
              <FontAwesomeIcon icon={faAngleDown} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                <Link href="profile" className="block px-4 py-2 hover:bg-gray-100">
                  Profile
                </Link>
                <Link href="reset-password" className="block px-4 py-2 hover:bg-gray-100">
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
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-[#171717] px-4 lg:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>

          <ul className={`flex flex-col md:flex-row gap-4 md:gap-6 ${isMobileMenuOpen ? "flex" : "hidden md:flex"}`}>
            {tabList.map((row) => (
              <li key={row.tab}>
                <Link
                  href={row.url}
                  onClick={() => setActiveTab(row.tab)}
                  className={`block py-2 px-3 font-semibold ${
                    row.tab === activeTab
                      ? "border-b-3 border-red-700"
                      : "border-transparent"
                  }`}
                >
                  {row.label}
                </Link>
              </li>
            ))}

            {(userType === "1" || !user) && (
              <RequestQuotebtn user={user} categories={categories} />
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
