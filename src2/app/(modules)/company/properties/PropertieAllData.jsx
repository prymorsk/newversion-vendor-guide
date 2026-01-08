"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useAuth } from "@/context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye,faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ButtonNew from "@/components/Common/ButtonNew";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const DeleteComponent = ({resultData,property,setPropertieData}) => {
    const [isDeleteLoding, setIsDeleteLoding] = useState(false);
    const employeDelete = async (e) => {
        e.preventDefault();
        setIsDeleteLoding(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`; // Set the Authorization header for Axios
        var formData = new FormData();
        formData.append('_method','DELETE');
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}property/${property.id}`, formData).then(response => {
            setIsDeleteLoding(false);
            let _managers = resultData.filter((val) => val.id !== property.id);
            setPropertieData(_managers);
            toast.success(response.data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }).catch(error => {
            setIsDeleteLoding(false);
            if(error?.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        });
    };
    return (
        <ButtonNew
            type="button"
            className="rounded-[0.7rem]  px-7 py-1 text-sm border-solid border border-gray-500 font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#c1272d] text-white px-4 py-2"
            severity="info"
            onClick={e => employeDelete(e)}
          >
            Delete {(isDeleteLoding==true) ? <FontAwesomeIcon icon={faSpinner} spin /> : ""}
        </ButtonNew>
    );
};

const PropertieAllData = ({propertieData,setPropertieData}) => {
  const {user,renderFieldError,isLoding}  = useAuth();
  
  const columns = [
      {field: 'property_name', header: 'Property Name',sortable:'sortable'},
      {field: 'property_type', header: 'Property Type'},
      {field: 'id', header: 'Action', colbody: true},
  ];
  // console.log(user.data.id)

  const paginatorLeft = <Button type="button"  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;
  const paginatorRight = <Button type="button" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;



  const favoriteBtn = (property) => {
      var actionBTN = (
        <>
          <Link
            href={`/company/properties/${property.id}`}
            className="rounded-[0.7rem]  px-7 py-1 text-sm border-solid border border-gray-500 font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#3b82f6] text-white px-4 py-2 mx-2"
            severity="info"
          >
            View
          </Link>
          <DeleteComponent property={property} resultData={propertieData} setPropertieData={setPropertieData} />
        </>
      );
      
      return actionBTN;
  };

  return (
    <DataTable className="table w-full  text-gray-700  dataTable no-footer dt-responsive " value={propertieData} paginator rows={10} paginatorTemplate="  PrevPageLink CurrentPageReport NextPageLink "
            currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} pt={{
                thead:{className:'border-[1px] border-black'},
                tbody:{className:'border-[1px] border-black'}
            }} >
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} body={col.colbody?favoriteBtn:''}   style={{ width: '25%' }} pt={{
                    headerCell:{className: 'p-4 pr-8 border-b-[1px] border-black  text-black sorting sorting_asc whitespace-nowrap text-black text-left '},
                    bodyCell:{className: 'p-4 pr-8  border-b-[1px] border-black sorting_1 whitespace-nowrap text-sm justify-around '}
                    }}  />
                ))}
    </DataTable>
  )
}

export default PropertieAllData