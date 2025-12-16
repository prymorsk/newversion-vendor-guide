"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useAuth } from "@/context/UserContext";
import BidFavoriteButton from "@/components/Front/BidFavoriteButton";
import AssignStatusButton from "@/app/(modules)/manager/bids/[id]/AssignStatusButton";
import Loading from "@/app/loadingScreen" 
import { ViewModal } from "../../Modal";


const BidMessage = ({bid}) => {
  const {navigate}  = useAuth();
  const [meLoding,setMeLoding] = useState(false);
  const handleGoVendors = async () => {
    setMeLoding(true);
    navigate.push(`/manager/message/${bid.id}/${bid.vendor_id}`);
  }

  return (
    <Button type="button" className="bg-green-600 text-white p-2" onClick={handleGoVendors} severity="info" >{meLoding ? <Loading /> : "Message"}</Button>
  )
}

const TableData = ({bidId}) => {
  const {user,renderFieldError,isLoding}  = useAuth();
  const [vendorsData, setVendorsData] = useState([]);
  const columns = [
      {field: 'name', header: 'Vendor Name',sortable:'sortable'},
      {field: 'email', header: 'Email'},
      {field: 'mobile', header: 'Mobile'},
      {field: 'assign_to', header: 'Award To Bid', actionBtn: statusBtn},
      {field: 'vendor_id', header: 'Action', actionBtn: favoriteBtn},
  ];
  // console.log(user.data.id)

  const paginatorLeft = <Button type="button"  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;
  const paginatorRight = <Button type="button" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-900  hover:bg-gray-50 focus:z-20 focus:outline-offset-0"  />;

  useEffect(() => {
    
    const allResult = async () => {
      try {
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bid-vendor/${bidId}?token=${getCookie('token')}`,{
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
		
		 console.log('Bids data showing..');
         console.log(newData);
		 
        const updatedRows = newData.map(item => ({
          'bid':item?.bid,
          'bid_status':item.bid.status,
          'id':item?.bid_id,
          'name':item.vendornew.name,
          'email':item.vendornew.email,
          'mobile':item.vendornew.mobile,
          'vendor_id':item?.vendor_id,
          'manager_id':item?.manager_id,
          'favorite':item.is_favourite,
          'bid_assgin_vendor':item.is_bid_assgin,
        }));
		console.log('Bids data showing..');
		console.log(updatedRows);
        setVendorsData(updatedRows);
        
        // console.error(requestsQuotes)
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
      }
    }
    allResult();


  }, [])

  function favoriteBtn (bid) {
    return <>
       <ViewModal data={vendorsData} />
      <BidFavoriteButton bid={bid} setVendorsData={setVendorsData} vendorsData={vendorsData}  /> <BidMessage bid={bid} /></>;
  };

  function statusBtn(bid) {  
    return <AssignStatusButton bid={bid} setVendorsData={setVendorsData} vendorsData={vendorsData} />; 
  };

  return (
    <DataTable className="table w-full  text-gray-700  dataTable no-footer dt-responsive " value={vendorsData} paginator rows={10} paginatorTemplate="  PrevPageLink CurrentPageReport NextPageLink "
            currentPageReportTemplate="{first} to {last} of {totalRecords}" paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} pt={{
                thead:{className:'border-[1px] border-black'},
                tbody:{className:'border-[1px] border-black'}
            }} >
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable} body={col.actionBtn}   style={{ width: '25%' }} pt={{
                    headerCell:{className: 'p-4 pr-8 border-b-[1px] border-black  text-black sorting sorting_asc whitespace-nowrap text-black text-left '},
                    bodyCell:{className: 'p-4 pr-8  border-b-[1px] border-black sorting_1 whitespace-nowrap text-sm justify-around '}
                    }}  />
                ))}
    </DataTable>
  )
}

export default TableData
