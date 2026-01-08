"use client";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/Modal";
import { useAuth } from "@/context/UserContext";
import { Button } from 'primereact/button';
import { useRouter } from "next/navigation";
import LoadingComponents from "@/components/LoadingComponents";
import EditFormView from "./ViewForm";

export const ViewModal = ({ data }) => {
  const {user}  = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  const router = useRouter();
  
  useEffect(() => {
    if(!getCookie('token')){
      router.push('/');
    }
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <section className="py-1">
        <Button type="button" className="bg-[#c1272d] text-white p-2" onClick={openModal} severity="info" > View</Button>
      {isLoad==false?(
        <div className="text-center text-xl font-semibold text-[#171717] text-left leading-[1.5rem]">
          <LoadingComponents />
        </div>
        ):(
        <>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {user!=null ? (
          <>
          <h1 className="text-3xl font-medium" >{data[0]?.name} Details</h1>
          <EditFormView user={user} data={data} navigate={router} onClose={closeModal} />
          </>
        ) : (
          <>
            <p className="text-xl mt-2">Kindly login or register</p>
            <div className="flex justify-center gap-x-2 mt-10">
              <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href="/manager/login" >Login</Link>
              <Link className="text-white bg-[#B13634] block   hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-normal rounded-lg text-xs sm:text-base lg:text-[1.100rem] px-2 sm:px-4 lg:px-4 py-2 lg:py-2 md:mr-2 focus:outline-none" href='/manager/register' >Register</Link>
            </div>
          </>
        )}
      </Modal>
      </>
      )}
    </section>
  );
};
