"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useAuth } from "@/context/UserContext";
import BidFavoriteButton from "@/app/(modules)/vendor/components/BidFavoriteButton";
import Loading from "@/app/loadingScreen" 

const BidMessage = ({bid}) => {
  const {navigate,user}  = useAuth();
  const [meLoding,setMeLoding] = useState(false);
  const handleGoVendors = async () => {
    setMeLoding(true);
    // console.log(user)
    if(user.type==1){
      navigate.push(`/message/${bid.id}/${bid.vendor_id}`);
    }else{
      navigate.push(`/message/${bid.id}/${bid.manager_id}`);
    }
  }
// console.log(bid)
  return (
    <Button type="button" className="bg-green-600 text-white p-2" onClick={handleGoVendors} severity="info">{meLoding ? <Loading /> : "Message"}</Button>
  )
}

const TableData = () => {
  const {user,renderFieldError,isLoding}  = useAuth();
  const [vendorsData, setVendorsData] = useState([]);
  const columns = [
      {field: 'name', header: 'Sender Name',sortable:'sortable'},
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
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bid-vendor-message?token=${getCookie('token')}`,{
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
        if(user.type==1){
          var updatedRows = newData.map(item => ({
            'bid':item?.bid,
            'bid_status':item?.is_bid_status,
            'id':item?.bid_id,
            'name':item.vendor.name,
            'email':item.vendor.email,
            'mobile':item.vendor.mobile,
            'vendor_id':item?.vendor_id,
            'manager_id':item?.manager_id,
            'favorite':item.is_favourite,
          }));
        }else{
          var updatedRows = newData.map(item => ({
            'bid':item?.bid,
            'bid_status':item?.is_bid_status,
            'id':item?.bid_id,
            'name':item.vendor.name,
            'email':item.vendor.email,
            'mobile':item.vendor.mobile,
            'vendor_id':item?.vendor_id,
            'manager_id':item?.manager_id,
            'favorite':item.is_favourite,
          }));
        }
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
    return <><BidFavoriteButton bid={bid} setVendorsData={setVendorsData} vendorsData={vendorsData} /> <BidMessage bid={bid} /></>;
  };

  return (
<>
 <section className="inner hero-section commonpage">
        <div className="container mx-auto px-4 flex flex-row gap-4 items-center"></div>
      </section>

      <section className="innerpage-wapper-sections">
        <div className="container mx-auto">
          <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 flex-col lg:flex-row gap-10 border border-gray-300 leading-relaxed text-gray-800">
            <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato lg:px-10">
              Message
            </h1>



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

      </div>
        </div>
      </section>
      </>
  )
}

export default TableData
