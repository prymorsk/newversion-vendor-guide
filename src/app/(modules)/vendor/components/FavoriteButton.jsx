import { Button } from 'primereact/button';
import Loading from "@/app/loadingScreen" 
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
const FavoriteButton = ({row,setRequestsQuotes}) => {
    const [isLoading, setLoading] = useState(false)

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
            'vendorname':item.vendor.name,
            'contact':item.vendor.email,
            'phone':item.vendor.mobile,
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
    
    const handleRemoveFavorite = async () => {
      setLoading(true);
      
      try {
        const formData = new FormData()
        const favouriteRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}favourite/${row?.id}`,{
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`
          }
        })
        if (!favouriteRes.ok) {
            throw new Error('Failed to submit the data. Please try again.')
        }
        
        // Handle response if necessary
        var dataProp = await favouriteRes.json()
        toast.error(dataProp.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            bidResponse();
          setLoading(false)
        
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
        setLoading(false)
      }
    }

    return <Button type="button" className="bg-[#c1272d] text-white p-2" onClick={handleRemoveFavorite} severity="info" > {isLoading ? <Loading /> : "Remove from favorite"}  </Button>;
}

export default FavoriteButton;
