"use client";
import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ButtonNew from "@/components/Common/ButtonNew";

export const DeleteComponent = ({resultData,property,setEmployees}) => {
    const [isDeleteLoding, setIsDeleteLoding] = useState(false);
    const employeDelete = async (e) => {
        e.preventDefault();
        setIsDeleteLoding(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`; // Set the Authorization header for Axios
        var formData = new FormData();
        formData.append('_method','DELETE');
        await axios.post(`${process.env.BASE_API_URL}manager/${property.id}`, formData).then(response => {
            setIsDeleteLoding(false);
            let _managers = resultData.filter((val) => val.id !== property.id);
            setEmployees(_managers);
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

const EmployeesAllData = ({resultData,setEmployees}) => {
    
    const columns = [
      {field: 'manager_name', header: 'Manager Name',sortable:'sortable', colbody2: true},
      {field: 'email', header: 'Email'},
      {field: 'mobile', header: 'Mobile'},
      {field: 'manager_type', header: 'Manager Type'},
      {field: 'id', header: 'Action', colbody: true},
  ];

  const paginatorLeft = <Button type="button"  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;
  const paginatorRight = <Button type="button" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;

  const favoriteBtn = (property) => {
    var actionBTN = (
        <>
          <Link
            href={`/company/employees/${property.id}`}
            className="rounded-[0.7rem]  px-7 py-1 text-sm border-solid border border-gray-500 font-semibold text-black shadow-sm hover:bg-[#B13634 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-[#3b82f6] text-white px-4 py-2 mx-2"
            severity="info"
          >
            View
          </Link>
          <DeleteComponent property={property} resultData={resultData} setEmployees={setEmployees} />
        </>
      );
      
      return actionBTN;
  };

  const representativeBodyTemplate = (rowData) => {

    return (
        <div className="flex items-center gap-2">
            <Image className="h-8 w-8 rounded-full ltr:xl:mr-2 rtl:xl:ml-2" alt={rowData.manager_name} src={rowData.image_url} width="32" height="32" />
            <span className="text-left block align-middle text-sm font-lato">{rowData.manager_name}</span>
        </div>
    );
  };

  return (
    <DataTable className="table w-full  text-gray-700  dataTable no-footer dt-responsive " value={resultData} paginator rows={10} paginatorTemplate="  PrevPageLink CurrentPageReport NextPageLink "
            currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} pt={{
                thead:{className:'border-[1px] border-black'},
                tbody:{className:'border-[1px] border-black'}
            }} >
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} body={col.colbody?favoriteBtn:col.colbody2?representativeBodyTemplate:''}   style={{ width: '25%' }} pt={{
                    headerCell:{className: 'p-4 pr-8 border-b-[1px] border-black  text-black sorting sorting_asc whitespace-nowrap text-black text-left '},
                    bodyCell:{className: 'p-4 pr-8  border-b-[1px] border-black sorting_1 whitespace-nowrap text-sm justify-around '}
                    }}  />
                ))}
    </DataTable>
  )
}

export default EmployeesAllData