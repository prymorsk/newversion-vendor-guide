"use client";
import Link from "next/link";

import Logo from "/public/images&icons/SVG/logo.svg";
import Image from "next/image";
import { useAuth } from "@/context/UserContext";
import { getCookie } from "cookies-next";
import Modal from "@/components/Modal";
import PropartyForm from "@/components/PropartyForm";
import React, { useEffect, useState } from "react";

const RequestQuotebtn = ({user,categories}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryData, setCategoryData] = useState(categories);
    const [isActive, setIsActive] = useState(false);
    const [vendorId, setVendorId] = useState(0);
    const  UserType  = getCookie('user-type');
	const [stateData, setStateData] = useState([]);

    // for model code
    const openModal = () => {
        setIsModalOpen(true);
        
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
	
	
	
	useEffect(() => {
    const categoriesResult = async () => {
      const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}category`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (!response2.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
	  
      const categoryResult = await response2.json();
      setCategoryData(categoryResult);
	  
    };
    
	
	if(categories.data.length === 0)
	    {
		
		categoriesResult();
		
		}
	
    
  }, []);
  

  useEffect(() => {
    const statesResult = async () => {
      const response3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}state`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });

      if (!response3.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
const stateResult = await response3.json();
      setStateData(stateResult.data);
    };
    statesResult();
    
  }, []);
	
	
	
	
	
	
	

  return (
    <>
 
    <Link
      href="/search"
      className="flex flex-row gap-4 justify-between items-center"
    onClick={(e)=>{e.preventDefault(); openModal()}}
    >Request a Quotes
    <em><Image width= "7" height ="12" src="/images/arrow.svg" alt="arrow" /></em></Link>
   
  
  <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1 className="request_title text-3xl font-medium" >Request a Quote !</h1>
        {user!=null ? (
            UserType !== '0' ? (
                <PropartyForm user={user} vendor_id={vendorId} onClose={closeModal} categoryData={categoryData} stateData={stateData} />
              ) : (
                <div className="mt-10 -tracking-2">This feature is not available for Vendor</div>
              )
          
        ) : (
          <>
            <p className="request_paragraph text-xl mt-2">Kindly login or register to request a quote</p>
            <div className="request_button flex justify-center gap-x-2 mt-4 sm:mt-10">
              <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href="/login" onClose={closeModal}>Login</Link>
              <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href='/register' onClose={closeModal}>Register</Link>
            </div>
            <div className="request_button_guest flex justify-center gap-x-2 mt-2">
              <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-6 py-2 lg:py-2 focus:outline-none" href='/register' onClose={closeModal}>Continue to Guest</Link>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default RequestQuotebtn;
