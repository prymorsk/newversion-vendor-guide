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
  const [propertie, setPropertie] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [states, setStates] = useState([]);
  const [regionalManagerData, setRegionalManagerData] = useState([]);
  const [propertyManagerData, setPropertyManagerData] = useState([]);
  const [leasingManagerData, setLeasingManagerData] = useState([]);
  const [propertyManagementCompanyData, setPropertyManagementCompanyData] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const hasCookie = getCookie('token')
  const [selectedStatets, setSelectedStatets] = useState([]);

  const router = useRouter();
  useEffect(() => {
    if(!getCookie('token')){
      router.push('/');
    }

    const propertyType = async () => {
      try {
          const type = 0;
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}property-type`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
        'token': `${getCookie('token')}`
            }
          })
          if (!response.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.title
          }));
      
      
      //console.log('Property Type mapped....')
      //console.log(newReginalManagers)


          setPropertyTypeData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }
    propertyType();

    const regionalManager = async () => {
      try {
          const type = 0;
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}manager?type=${type}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
        'token': `${getCookie('token')}`
            }
          })
          if (!response.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.name
          }));
       
       //console.log('regionalManager listing....')
      // console.log(newReginalManagers)
      
          setRegionalManagerData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }
    
    const propertyManager = async () => {
      try {
          const type1 = 1;
          const response1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}manager?type=${type1}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
        'token': `${getCookie('token')}`
            }
          })
          if (!response1.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response1.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.name
          }));
          setPropertyManagerData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }
    
    const leasingManager = async () => {
      try {
          const type2 = 2;
          const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}manager?type=${type2}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
        'token': `${getCookie('token')}`
            }
          })
          if (!response2.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response2.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.name
          }));
          setLeasingManagerData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }
    
    const propertyManagementCompany = async () => {
      try {
          const type3 = 3;
          const response3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}manager?type=${type3}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
        'token': `${getCookie('token')}`
            }
          })
          if (!response3.ok) {
              throw new Error('Failed to submit the data. Please try again.')
          }
          
          // Handle response if necessary
          var dataProp = await response3.json()
          var newReginalManagers = dataProp.data.map((v) => ({
              value: v.id,
              label: v.name
          }));
          setPropertyManagementCompanyData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }

    regionalManager();
    propertyManager();
    leasingManager();
    propertyManagementCompany();

    const statesResult = async () => {
      var response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendor-state-list`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getCookie('token')}`,
      'token': `${getCookie('token')}`
        }
          
      })
  
      if (!response2.ok) {
      throw new Error('Failed to submit the data. Please try again.')
      }
      var categoryResult = await response2.json();
      var newColourOptions = categoryResult.data.map((v) => ({
          value: v.id,
          label: v.name
      }));
        
      setStates(newColourOptions);
  }
  statesResult();
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
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}property/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${getCookie('token')}`,
      'token': `${getCookie('token')}`
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
        setPropertie(dataProp.data);
        setIsLoad(false);
        // const propertyRow = dataProp.data;
     console.log('data Prop...');
         console.log(dataProp.data)
     // console.log('propertie.data all...');
        // console.log(propertie)
     
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
      }
      
    }
    
    getPropertie();

  }, [])
  
  return (
<>
<section className="innerpage-wapper-sections">
<section className="inner hero-section commonpage">
<div className="container mx-auto px-4 flex flex-row gap-4 items-center"></div>
</section>



      {isLoad==true?(
        <div className="text-center text-xl font-semibold text-[#171717] text-left leading-[1.5rem]">
          <LoadingComponents />
        </div>
        ):(
        <>

       
        <div className="container mx-auto">
          <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 flex-col lg:flex-row gap-10 border border-gray-300 leading-relaxed text-gray-800">
            <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato lg:px-10">
              Property Details
            </h1>

            <div className="container mx-auto overflow-hidden xl:px-24 lg:px-8 md:px-12">
              <div className="mx-auto max-w-7xl">
              

      <div className="px-10 md:px-16">
        <div className="mb-10 text-right">
        <Link href="/company/properties"
                  className="rounded-[0.7rem]  px-7 py-1 text-sm border-solid  border border-gray-500 font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >Back</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-20 text-sm font-medium text-center border border-black  text-[#171717] p-5 bg-white">
          <div className="col-span-2 md:col-span-1 lg:pl-3">
            <div className="text-xl font-semibold text-[#171717] text-left leading-[1.5rem]">
             
      
        
         <p className="lg:text-[1.5rem] md:text-xl text-xl font-medium">
        Property Name: {propertie?.property_name}  </p>
          <p className="lg:text-[1.5rem] md:text-xl text-xl font-medium">Property Type: {propertie?.property_types?.title && `${propertie?.property_types?.title}`} </p>
       
               <p className="lg:text-[1.5rem] md:text-xl text-xl font-medium">Street Address: {propertie?.address}</p>
        <p className="lg:text-[1.5rem] md:text-xl text-xl font-medium">Address Line 2: {propertie?.address_2}</p>
          <p className="lg:text-[1.5rem] md:text-xl text-xl font-medium">State: {propertie?.states?.name}</p>
        
         <p className="lg:text-[1.5rem] md:text-xl text-xl font-medium"> City: {propertie?.city}</p>
        <p className="lg:text-[1.5rem] md:text-xl text-xl font-medium">Zip Code: {propertie?.zip_code}</p>
        
        
        
        
        
            </div>
            <div className="flex pt-16 text-left font-semibold">
              <ul className="pr-10 text-lg leading-[1.4rem]">
                <li>Regional Manager:</li>
                <li>Property Manager:</li>
                <li>Leasing / Assistant Manager:</li>
         <li>Property Management Company:</li>
              </ul>
              <ul className="text-lg leading-[1.4rem]">
                <li>{propertie?.propertyRegionalManager?.first_name}</li>
                <li>{propertie?.propertyManager?.first_name}</li>
                <li>{propertie?.LeasingAssistantManager?.first_name}</li>
         <li>{propertie?.PropertyCompanyManager?.first_name}</li>
              </ul>
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
            <div className="text-base leading-5 font-semibold text-[#171717] text-right pb-4 pr-3">
              <p>{propertie?.phone}</p>
              {propertie?.email?.split(',').map((email)=>(
                <p className="">{email}</p>
              ))}
              {/* <p className="">hello@solsticesprings.com</p> */}
            </div>
            <div className="">
              <Image width="100" height="100"
                src={propertie?.image_url}
                alt=""
                className="w-[30rem] h-75 float-right mx-auto"
              />
            </div>

          </div>
        </div>

      </div>
              </div>
            </div>
          </div>
        </div>
      

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {user!=null ? (
          <>
          <h1 className="text-3xl font-medium" >Edit Property Form </h1>
          <EditForm user={user} navigate={router} onClose={closeModal} propertie={propertie} setPropertie={setPropertie} states={states} regionalManagerData={regionalManagerData} propertyManagerData={propertyManagerData} leasingManagerData={leasingManagerData} propertyManagementCompanyData={propertyManagementCompanyData} propertyTypeData={propertyTypeData} selectedStatets={selectedStatets} setSelectedStatets={setSelectedStatets} />
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
    </>
  );
};

export default Page;
