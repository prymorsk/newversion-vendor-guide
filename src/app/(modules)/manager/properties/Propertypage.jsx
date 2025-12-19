"use client";
import Modal from "@/components/Modal";
import { useAuth } from "@/context/UserContext";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddForm from "./AddForm";
import PropertieAllData from "./PropertieAllData";

const Propertypage = () => {
  const {user}  = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [states, setStates] = useState([]);
  const [propertieData, setPropertieData] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  
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
          setPropertyTypeData(newReginalManagers);
      } catch (error) {
          // Capture the error message to display to the user
          console.error(error)
      }
    }

    propertyType();
    

    const allResult = async () => {
      try {
        var response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}property`,{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`,
              'token': `${getCookie('token')}`
          },
        })
        if (!response2.ok) {
            throw new Error('Failed to submit the data. Please try again.')
        }
        
        // Handle response if necessary
        var dataProp = await response2.json()
        var newData = dataProp.data;
        const updatedRows = newData.map(item => ({
          'property_name':item.property_name,
          'property_type':item?.property_types?.title,
          'id':item.id,
        }));
        setPropertieData(updatedRows);
        // console.error(requestsQuotes)
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
      }
    }
    allResult();

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

  return (
    <>


 <section id="hero_section" className="inner hero-section commonpage" >
  {/* Hero Section */}
  </section>

      
<section className="innerpage-wapper-sections">
<div className="container mx-auto">
  <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8   bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
<div id="featurs_section" className="py-9 md:py-5 ">
  <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold    font-lato lg:px-10" >Property </h1>



      <section className="pt-8 sm:pt-14">
        <div className="px-10">
          <div className="mb-8 sm:mb-10 text-right">
          <Link
                    href="#"
                    onClick={openModal}
                    className="rounded-[0.7rem]  px-7 py-1 text-sm border-solid  border border-gray-500 font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >Add</Link>
          </div>
            <PropertieAllData propertieData={propertieData} setPropertieData={setPropertieData} />


          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {user!=null ? (
              <>
              <h1 className="text-3xl font-medium" >Add Property Form </h1>
              <AddForm user={user} navigate={router} onClose={closeModal} states={states} setPropertieData={setPropertieData} propertyTypeData={propertyTypeData} />
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
        </div>
      </section>

      </div>
      </div>
     </div>
    </section>
    </>
  );
};

export default Propertypage;
