"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useAuth } from "@/context/UserContext";
import BidFavoriteButton from "../../components/BidFavoriteButton";
import Loading from "@/app/loadingScreen" 
import { ViewModal } from "../../Modal";


const BidMessage = ({bid}) => {
  const {navigate}  = useAuth();
  const [meLoding,setMeLoding] = useState(false);
  const handleGoVendors = async () => {
    setMeLoding(true);
    navigate.push(`/vendor/message/${bid.id}/${bid.manager_id}`);
  }
// console.log(bid)
  return (
    <Button type="button" className="bg-green-600 text-white p-2" onClick={handleGoVendors} severity="info">{meLoding ? <Loading /> : "Message"}</Button>
  )
}

const TableData = ({bidId}) => {
  const {user,renderFieldError,isLoding}  = useAuth();
  const [vendorsData, setVendorsData] = useState([]);
  const columns = [
      {field: 'name', header: 'Manager Name',sortable:'sortable'},
      {field: 'email', header: 'Email'},
      {field: 'mobile', header: 'Mobile'},
      {field: 'vendor_id', header: 'Action', colbody: true},
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
        // console.log(newData);
         const updatedRows = newData.map(item => ({
          'bid':item?.bid,
          'bid_status':item.bid.status,
          'id':item?.bid_id,
          'name':item.manager.name,
          'email':item.manager.email,
          'mobile':item.manager.mobile,
          'vendor_id':item?.vendor_id,
          'manager_id':item?.manager_id,
          'favorite':item.is_favourite,
          }));
          
		  //const updatedRows = newData.map(item => ({
          //'bid':item?.bid,
          //'bid_status':item?.is_bid_status,
          //'id':item?.bid_id,
          //'name':item.bid?.first_name,
          //'email':item.bid?.email,
          //'mobile':item.bid?.phone,
          //'vendor_id':item?.vendor_id,
          //'manager_id':item.bid?.manager_id,
          //'favorite':item.is_favourite,
        //}));
		
		
        setVendorsData(updatedRows);
        
        // console.error(requestsQuotes)
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
      }
    }
    allResult();
  }, [user])

  const favoriteBtn = (bid) => {
    return <>
              <ViewModal data={vendorsData} />

      <BidFavoriteButton bid={bid} setVendorsData={setVendorsData} vendorsData={vendorsData} /> <BidMessage bid={bid} /></>;
  };

  return (
    <DataTable className="table w-full  text-gray-700  dataTable no-footer dt-responsive " value={vendorsData} paginator rows={10} paginatorTemplate="  PrevPageLink CurrentPageReport NextPageLink "
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

export default TableData
