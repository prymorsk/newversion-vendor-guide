"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PropartyForm from "@/components/PropartyForm";
import VendorContactMailForm from "@/components/VendorContactMailForm";
import Modal from "@/components/Modal";
import { getCookie } from "cookies-next";

const DetailsRight = ({ filterData, user }) => {
  const vendorDefult = "/images&icons/vendor-default.jpg";

  const [categoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMail, setIsModalOpenMail] = useState(false);
  const [vendorId, setVendorId] = useState(filterData?.id);
  const flogo = "/images&icons/SVG/logo_white.svg";



  const vendorNewAddress = filterData?.address
    ? filterData.address.split(",").slice(0, -1).join(",")
    : "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}category`, {
          method: "GET",
          headers: { Authorization: `Bearer ${getCookie("token")}` },
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const result = await res.json();
        setCategoryData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{filterData?.name}</h1>
          <p className="text-2xl font-medium mt-1">{vendorNewAddress}-{filterData.postal_code }</p>
        </div>

        <div className="max-h-[85px]">
        <Image
        src={filterData?.image_url ? filterData?.image_url:flogo}
        alt="logo"
        width={200}
        height={200}
        className="max-h-[85px] w-auto object-contain"
        />
        </div>

      </div>

      

      {/* Services */}

      {filterData?.service_status ? (
          <>
          <hr className="my-4" />
      <h2 className="font-semibold text-lg inline">Services Offered:</h2>

     

          
           <div className="grid grid-cols-2 mt-3 text-sm gap-y-1">
          {filterData.services &&
          filterData.services.map((rowmain, index) => (
          <p key={index}>• {rowmain.title}</p>
          ))}
          </div>
          </>
          ) : (
          ''
          )}




      

      <hr className="my-4" />

      <p className="text-lg font-semibold">
        Phone Number:
        <span className="text-black font-bold"> {filterData?.mobile ? (<Link href={`tel:${filterData.mobile}`} className="">{filterData.mobile}</Link>):(
          'NA'
         )}</span>
      </p>

      <div className="flex flex-wrap gap-4 mt-5">
        <button
          onClick={() => {
            setVendorId(filterData?.id);
            setIsModalOpen(true);
          }}
          className="bg-[#B13634] text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm"
        >
          Request a Quotes 
        </button>

        <button
          onClick={() => {
            setVendorId(filterData?.id);
            setIsModalOpenMail(true);
          }}
          className="bg-[#B13634] text-white border border-gray-400 px-5 py-2 rounded-full flex items-center gap-2 text-sm"
        >
          Contact Vendor 
        </button>


{filterData?.website_url && (
<button
onClick={() => {
setVendorId(filterData?.id);
setIsModalOpenMail(true);
}}
className="bg-[#B13634] text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm"
>
<Link
href={
filterData.website_url.includes("http")
? filterData.website_url
: `https://${filterData.website_url}`
}

rel="nofollow"
target="_blank"
>
Website ↗
</Link>
</button>
)}




      </div>

      <hr className="my-6" />

     
      <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: filterData?.description }} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1 className="text-3xl font-medium">Request a Quote!</h1>
        {user ? (
          <PropartyForm
            user={user}
            vendor_id={vendorId}
            onClose={() => setIsModalOpen(false)}
            categoryData={categoryData}
          />
        ) : (
          <>
            <p className="text-xl mt-2">Kindly login or register to request a quote</p>
            <div className="flex justify-center gap-x-2 mt-10">
              <Link className="text-white bg-[#B13634] px-4 py-2 rounded-lg" href="/login">
                Login
              </Link>
              <Link className="text-white bg-[#B13634] px-4 py-2 rounded-lg" href="/manager/register">
                Register
              </Link>
            </div>
          </>
        )}
      </Modal>

      <Modal isOpen={isModalOpenMail} onClose={() => setIsModalOpenMail(false)}>
        <h1 className="text-3xl font-medium">Contact Vendor</h1>
        <VendorContactMailForm vendor_id={vendorId} onClose={() => setIsModalOpenMail(false)} />
      </Modal>
    </>
  );
};

export default DetailsRight;
