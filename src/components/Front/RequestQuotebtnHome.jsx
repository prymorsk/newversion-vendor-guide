"use client";
import Link from "next/link";
import Image from "next/image";
import { getCookie } from "cookies-next";
import React, { useEffect, useState, useCallback } from "react";
import ModalHome from "@/components/ModalHome";
import PropartyForm from "@/components/PropartyForm";

const RequestQuotebtnHome = ({ user, categories }) => {
  const [isModalOpenHome, setIsModalOpenHome] = useState(false);
  const [categoryData, setCategoryData] = useState(categories);
  const [vendorId, setVendorId] = useState(0);
  const [stateData, setStateData] = useState([]);

  const UserType = getCookie("user-type");

  /* ---------------- Modal handlers (stable) ---------------- */
  const openModalHome = useCallback(() => {
    setIsModalOpenHome(true);
  }, []);

  const closeModalHome = useCallback(() => {
    setIsModalOpenHome(false);
  }, []);

  /* ---------------- Fetch categories ---------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}category`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!categories || categories?.data?.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  /* ---------------- Fetch states ---------------- */
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}state`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );
        const data = await response.json();
        setStateData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStates();
  }, []);

  return (
    <>
      {/* ---------- OPEN MODAL BUTTON ---------- */}
      <Link
        href="#"
        className="flex flex-row gap-4 justify-between items-center"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // ✅ IMPORTANT
          openModalHome();
        }}
      >
        Request a Quote
        <em>
          <Image width={7} height={12} src="/images/arrow.svg" alt="arrow" />
        </em>
      </Link>

      {/* ---------- MODAL ---------- */}
      <ModalHome isOpen={isModalOpenHome} onClose={closeModalHome}>
        <h1 className="request_title text-3xl font-medium custom-text-black">
          Request a Quote!
        </h1>

        {user ? (
          UserType !== "0" ? (
            <PropartyForm
              user={user}
              vendor_id={vendorId}
              categoryData={categoryData}
              stateData={stateData}
              onClose={closeModalHome} // ✅ closes modal properly
            />
          ) : (
            <div className="mt-10">
              This feature is not available for Vendor
            </div>
          )
        ) : (
          <>
            <p className="request_paragraph text-xl mt-2 custom-text-black">
              Kindly login or register to request a quote
            </p>

            <div className="flex justify-center gap-2 mt-6">
              <Link
                href="/login"
                className="text-white bg-[#B13634] px-4 py-2 rounded"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-white bg-[#B13634] px-4 py-2 rounded"
              >
                Register
              </Link>
            </div>
 <div className="request_button_guest flex justify-center gap-x-2 mt-2">
              <Link
                href="/register"
                className="text-white bg-[#B13634] block hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.1rem] px-2 sm:px-4 lg:px-6 py-2"
              >
                Continue as Guest
              </Link>
            </div>

            
          </>
        )}
      </ModalHome>
    </>
  );
};

export default RequestQuotebtnHome;
