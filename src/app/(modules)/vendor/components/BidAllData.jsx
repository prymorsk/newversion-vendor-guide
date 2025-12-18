"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useAuth } from "@/context/UserContext";
import Loading from "@/app/loadingScreen" 

const BidVendorsButton = ({bid}) => {
  const {navigate}  = useAuth();
  const [meLoding,setMeLoding] = useState(false);
  const handleGoVendors = async () => {
    setMeLoding(true);
    navigate.push(`/vendor/bids/${bid.id}`);
  }

  return (
    <Button type="button" className="bg-[#c1272d] text-white p-2" onClick={handleGoVendors} severity="info" >{meLoding ? <Loading /> : "View"}</Button>
  )
}

const BidAllData = () => {
  const {user,renderFieldError,isLoding,navigate}  = useAuth();
  const [requestsQuotes, setRequestsQuotes] = useState([]);
  const [bidStatus, setBidStatus] = useState([]);
  // console.log(requestsQuotes)
  const columns = [
      {field: 'bidenumber', header: 'Bid Number',sortable:'sortable'},
      {field: 'bidtitle', header: 'Bid Title'},
      {field: 'bidtype', header: 'Bid Type'},
      {field: 'property', header: 'Property'},
      {field: 'createddate', header: 'Creation Date'},
      {field: 'closedate', header: 'Est.Close Date'},
      {field: 'priority', header: 'Priority'},
      {field: 'status', header: 'Status'},
      {field: 'vendor', header: 'Vendors', actionBtn: vendorBtn},
  ];
  const [tabnumber, settabNumber] = useState(1);
  // console.log(user.data.id)

  const paginatorLeft = <Button type="button"  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;
  const paginatorRight = <Button type="button" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;

  useEffect(() => {
    
    const bidResponse = async () => {
      try {
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bid?token=${getCookie('token')}`,{
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
        const bidenumber = new Date().getFullYear();
        const updatedRows = newData.map(item => ({
          'favorite':item.favourite,
          'favorite_id':item.favourite_id,
          'id':item.id,
          'manager_id':item.manager_id,
          'bidenumber':item.bid_number,
          'bidtitle':item.project_name,
          'bidtype':item.project_type,
          'property':item.property_name,
          'createddate':item.created_at,
          'closedate':item.close_date,
          'status':item.bid_status.title,
          'priority':item.priority
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

    const bidStatusLoad = async () => {
      const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bid-status`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getCookie('token')}`
        },
      })
      var dataProp = await response2.json()
      var newData = dataProp?.data;  
      setBidStatus(newData)
    }
    bidStatusLoad();
  }, [])

  function vendorBtn (bid) {
    // navigate.push(`/manager/bids/${bid.id}`);
    return <BidVendorsButton bid={bid}  />;
  };


  return (
    <DataTable className="table w-full  text-gray-700  dataTable no-footer dt-responsive " value={requestsQuotes} paginator rows={10} paginatorTemplate="  PrevPageLink CurrentPageReport NextPageLink "
            currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} pt={{
                thead:{className:'border-[1px] border-black'},
                tbody:{className:'border-[1px] border-black'}
            }} >
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} body={col.actionBtn}   style={{ width: '10%' }} pt={{
                    headerCell:{className: 'p-4 pr-4 border-b-[1px] border-black  text-black sorting sorting_asc whitespace-nowrap text-black text-left '},
                    bodyCell:{className: 'p-4 pr-4  border-b-[1px] border-black sorting_1 whitespace-nowrap text-sm justify-around '}
                    }}  />
                ))}
    </DataTable>
  )
}

export default BidAllData
