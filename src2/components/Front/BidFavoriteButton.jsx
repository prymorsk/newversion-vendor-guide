import { Button } from 'primereact/button';
import Loading from "@/app/loadingScreen" 
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
const BidFavoriteButton = ({bid,setVendorsData ,vendorsData}) => {
    const [isLoading, setLoading] = useState(false)
    // const [isFavorite, setIsFavorite] = useState(bid.favorite)
    // const [favoriteId, setFavoriteId] = useState(bid.favorite_id)
    // console.log(isFavorite)

    const allBidResult = async () => {
      try {
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}bid-vendor/${bid.id}`,{
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

    const handleFavorite = async () => {
    //   console.log(bid)
      setLoading(true);
      
      try {
        const formData = new FormData()
        formData.append('vendor_id',bid.vendor_id);
        formData.append('manager_id',bid.manager_id);
        const favouriteRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}favourite`,{
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`
          },
          body: formData,
        })
        if (!favouriteRes.ok) {
            throw new Error('Failed to submit the data. Please try again.')
        }
        
        // Handle response if necessary
        var dataProp = await favouriteRes.json()
        // var newData = dataProp.data;
        // console.log(dataProp.msg)
        // setFavoriteId(dataProp.data.id);
        toast.success(dataProp.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            allBidResult();
            setLoading(false)
        // setIsFavorite(1)
        // console.error(requestsQuotes)
        
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
        setLoading(false)
        // setIsFavorite(0)
      }
    }
    
    const handleRemoveFavorite = async () => {
      //   console.log(bid.favorite_id)
      setLoading(true);
      
      try {
        const formData = new FormData()
        const favouriteRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}favourite/${bid?.favorite?.id}`,{
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
        // var newData = dataProp.data;
        // console.log(dataProp.msg)
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
          allBidResult();
          setLoading(false)
        // setIsFavorite(0)
        // console.error(requestsQuotes)
        
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
        setLoading(false)
        // setIsFavorite(1)
      }
    }

    return bid?.favorite ? <Button type="button" className="bg-[#c1272d] text-white p-2" onClick={handleRemoveFavorite} severity="info" > {isLoading ? <Loading /> : "Remove from favorite"}  </Button> :<Button type="button" className="bg-[#c1272d] text-white p-2" onClick={handleFavorite} severity="info" > {isLoading ? <Loading /> : "Add To favorite"}  </Button>;
}

export default BidFavoriteButton;