"use client";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/Modal";
import { useAuth } from "@/context/UserContext";
import EditForm from "../EditForm";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import LoadingComponents from "@/components/LoadingComponents";

const Page = ({ params }) => {
  const {user,renderFieldError,isLoding,navigate}  = useAuth();
  const id = params.id;
  const [manager, setManagers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const hasCookie = getCookie('token');
  const [isLoading, setIsLoading] = useState(true);

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
  
  useEffect(() => {
    const getPropertie = async () => {
      try {
        const response2 = await fetch(`${process.env.BASE_API_URL}manager/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getCookie('token')}`
          },
        })
        if (!response2.ok) {
          // throw new Error('Failed to submit the data. Please try again.')
          toast.error('Failed to submit the data. Please try again.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        }
    
        // Handle response if necessary
        var dataProp = await response2.json()
        setManagers(dataProp.data);
        setIsLoad(false);
        // const propertyRow = dataProp.data;
        // console.log(dataProp.data)
        // console.log(propertie)
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
      }
      
    }
    
    getPropertie();
// console.log(propertie);
  }, [])
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
                    Employee Detail
                  </h1>



      {isLoad==true?(
        <div className="text-center text-xl font-semibold text-[#171717] text-left leading-[1.5rem]">
          <LoadingComponents />
        </div>
        ):(
        <>
      <div className="px-10 md:px-16">
        <div className="mb-10 text-right">
        <Link href="/company/employees"
                  className="rounded-[0.7rem]  px-7 py-1 text-sm border-solid  border border-gray-500 font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Back</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-20 text-sm font-medium text-center border border-black  text-[#171717] p-5 bg-white">
          <div className="col-span-2 md:col-span-1 lg:pl-3">
            <div className="text-xl font-semibold text-[#171717] text-left leading-[1.5rem]">
              <p className="lg:text-[1.5rem] md:text-xl text-xl font-medium">{manager?.name}</p>
              <p>{manager?.address}</p>
            </div>
            <div className="flex pt-16 text-left font-semibold">
            {
              manager?.type=='regional'?'Regional Manager'
              :manager?.type=="leasing_/_assistant_manager"?'Leasing or Assistant Manager'
              :manager?.type=="proparty"?'Property Manager'
              :manager?.type=="property_management_company"?'Property Management Manager':""
            }
              {/* <ul className="pr-10 text-lg leading-[1.4rem]">
                <li>Regional Manager</li>
                <li>Property Manager</li>
                <li>Leasing Manager</li>
              </ul>
              <ul className="text-lg leading-[1.4rem]">
                <li>Clay Brooks</li>
                <li>Noah Bennet</li>
                <li>Jordyn Hamilton</li>
              </ul> */}
            </div>
            <div className="my-10">
              <form>
                <div className="flex text-center justify-center gap-x-6  lg:pr-16">
                  {/* <SaveEditButton name="Add/Edit" /> */}
                  <Link
                  href="#"
                  onClick={openModal}
                  className="rounded-[0.7rem]  px-7 py-1 text-sm border-solid  border border-gray-500 font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Edit</Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            {/* <div className="text-base leading-5 font-semibold text-[#171717] text-right pb-4 pr-3">
              <p>(952) 746-5343</p>
              <p className=""> manager@solsticesprings.com</p>
              <p className="">hello@solsticesprings.com</p>
            </div> */}
            <div className="">
              <Image width="100" height="100"
                src={manager?.image_url}
                alt=""
                className="w-[30rem] h-75 float-right mx-auto"
              />
            </div>

          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {user!=null ? (
          <>
          <h1 className="text-3xl font-medium" >Edit Manager</h1>
          <EditForm user={manager} onClose={closeModal} manager={manager} setManagers={setManagers} />
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
              </div>
              </div>
            </div>
          </section>
    </>
  );
};

export default Page;
