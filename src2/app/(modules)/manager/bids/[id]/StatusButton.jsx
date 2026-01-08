import { Button } from 'primereact/button';
import Loading from "@/app/loadingScreen"
import { useEffect } from "react";
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify'; 
import axios from 'axios'; 


const StatusButton = ({ bid,setRequestsQuotes ,requestsQuotes,bidStatus}) => {
   
  const [isLoading, setLoading] = useState(false)
  // const [changeStatus, setChangeStatus] = useState(bid?.bid?.bid_status?.status)
  // console.log(bid);
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
        'status':item.status,
        'priority':item.priority
      }));
      setRequestsQuotes(updatedRows);
      // console.error(requestsQuotes)
    } catch (error) {
      // Capture the error message to display to the user
      console.error(error)
    }
  }

  const handleStatusChange = async (currentStatus) => {
    // setChangeStatus(currentStatus) 
    
    const data = {
      'bid_id': bid.id,
      'status': currentStatus,
    }; 
      data.token = `${getCookie('token')}`
    axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}bid-assgin-status`, data).then(response => {
      const result = response.data; 
        if(response.data){ 
          bidResponse();
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
            
        } 
    })
  };
  

  
  return (
<> 
      <select name="company_id" className="w-full bg-gray-100 border border-gray-100 text-sm py-3 px-4 pr-8 rounded"
        value={bid?.status} onChange={(e) => {handleStatusChange(e.target.value); }}
        disabled={(bid?.status==5 || bid?.status==6)?true:false}
      > 
        {bidStatus?.map((status, index) => (
          <option key={index} value={status.id}>
            {status.title}
          </option>
        ))}
      </select> 
    </>
  );
}

export default StatusButton;
