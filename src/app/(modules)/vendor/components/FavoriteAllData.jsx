"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useAuth } from "@/context/UserContext";
import FavoriteButton from "./FavoriteButton";


const FavoriteAllData = () => {
  const {user,renderFieldError,isLoding}  = useAuth();
  const [requestsQuotes, setRequestsQuotes] = useState([]);
  const columns = [
      {field: 'managername', header: 'Manager Name',sortable:'sortable'},
      {field: 'contact', header: 'Contact'},
      {field: 'phone', header: 'Phone'},
      {field: 'manager_id', header: 'Action', actionButton: favoriteBtn},
  ];

  const [tabnumber, settabNumber] = useState(1);
  // console.log(user.data.id)

  const paginatorLeft = <Button type="button"  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;
  const paginatorRight = <Button type="button" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;

  useEffect(() => {
    
    const bidResponse = async () => {
      try {
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}favourite?token=${getCookie('token')}`,{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`
          },
        })
        if (!response2.ok) {
            throw new Error('Failed to submit the data. Please try again.')
        }
        
        // Handle response if necessary
        var dataProp = await response2.json()
        var newData = dataProp.data;
        // console.log(newData)
        // const bidenumber = new Date().getFullYear();
        const updatedRows = newData.map(item => ({
          'managername':item.manager.name,
          'contact':item.manager.email,
          'phone':item.manager.mobile,
          'vendor_id':item.vendor_id,
          'manager_id':item.manager_id,
          'id':item.id
        }));
        setRequestsQuotes(updatedRows);
        // console.error(requestsQuotes)
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
      }
    }
    bidResponse();
    // console.log(requestsQuotes)
  }, [])

  function favoriteBtn (row) {
    return <FavoriteButton row={row} setRequestsQuotes={setRequestsQuotes}  />;
  };


  return (
    <DataTable className="table w-full  text-gray-700  dataTable no-footer dt-responsive " value={requestsQuotes} paginator rows={10} paginatorTemplate="  PrevPageLink CurrentPageReport NextPageLink "
            currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} pt={{
                thead:{className:'border-[1px] border-black'},
                tbody:{className:'border-[1px] border-black'}
            }} >
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} body={col.actionButton}   style={{ width: '25%' }} pt={{
                    headerCell:{className: 'p-4 pr-8 border-b-[1px] border-black  text-black sorting sorting_asc whitespace-nowrap text-black text-left '},
                    bodyCell:{className: 'p-4 pr-8  border-b-[1px] border-black sorting_1 whitespace-nowrap text-sm justify-around '}
                    }}  />
                ))}
    </DataTable>
  )
}

export default FavoriteAllData
