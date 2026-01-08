import { Button } from 'primereact/button';
import Loading from "@/app/loadingScreen"
import { useEffect } from "react";
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify'; 
import axios from 'axios'; 


const AssignStatusButton = ({ bid,setVendorsData ,vendorsData}) => {
   
  const [isLoading, setLoading] = useState(false)
  const [oStatus, setOStatus] = useState()
  const [statusOption, setStatusOption] = useState(['Awarded','Award'])
  // console.log(bid.bid.status)
  const allResult = async () => {
    try {
      const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bid-vendor/${bid.id}?token=${getCookie('token')}`,{
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
        'bid_status':item?.is_bid_status,
        'id':item?.bid_id,
        'name':item.vendor.name,
        'email':item.vendor.email,
        'mobile':item.vendor.mobile,
        'vendor_id':item?.vendor_id,
        'manager_id':item?.manager_id,
        'favorite':item.is_favourite,
        'bid_assgin_vendor':item.is_bid_assgin,
      }));
      setVendorsData(updatedRows);
      
      // console.error(requestsQuotes)
    } catch (error) {
      // Capture the error message to display to the user
      console.error(error)
    }
  }
  

  const handleStatusChange = async () => {
    // setChangeStatus(currentStatus) 
    const confirmBox = window.confirm(
      "Do you really want to Award to bid?"
    )
    if (confirmBox === true) {
      setLoading(true);
      const data = {
        'bid_id': bid.id,
        'manager_id': bid.manager_id,
        'vendor_id': bid.vendor_id
      }; 
      axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}bid-assgin-vendor?token=${getCookie('token')}`, data).then(response => {
          const result = response.data; 
          // setOStatus(currentStatus);
          setLoading(false);
          allResult();
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
              
      })
    }
  };
  
  const handleStatusRemove = async () => {
    // setChangeStatus(currentStatus) 
    const confirmBox = window.confirm(
      // "Do you really want to retract the bid?"
       "Do you really want to award the job to this Vendor on clicking award?"
    )
    if (confirmBox === true) {
      setLoading(true);
      const data = {
        'bid_id': bid.id,
        'manager_id': bid.manager_id,
        'vendor_id': bid.vendor_id
      }; 
      axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}bid-assgin-vendor?token=${getCookie('token')}`, data).then(response => {
          const result = response.data; 
          // setOStatus(currentStatus);
          setLoading(false);
          allResult();
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
              
      })
    }
  };
  

  
  return (
    <> 
      {bid.bid?.status==4 || bid.bid?.status==5 || bid.bid?.status==6 ? (
        <>
        {bid.bid_assgin_vendor?.id ? 
          <Button type="button" className='bg-cyan-500 text-white p-2 p-button p-component p-button-info' disabled={(bid.bid?.status==5 || bid.bid?.status==6)?true:false} onClick={(e) => {handleStatusRemove();}} >{ isLoading ? <Loading /> : 'Awarded' }</Button>

            :
          <Button type="button" className='bg-cyan-500 text-white p-2 p-button p-component p-button-info' disabled={(bid.bid?.status==5 || bid.bid?.status==6)?true:false} onClick={(e) => {handleStatusChange();}}>{ isLoading ? <Loading /> : 'Contacted' }</Button>
            }
        </>
      ):
      <Button type="button" className='bg-cyan-500 text-white p-2 p-button p-component p-button-info' onClick={(e) => {handleStatusChange();}} disabled={bid?.bid?.status==1?true:false}>{ isLoading ? <Loading /> : 'Award' }</Button>
      }
    </>
  );
}

export default AssignStatusButton;
