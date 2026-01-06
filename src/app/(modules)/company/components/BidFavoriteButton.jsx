
import { Button } from 'primereact/button';
import Loading from "@/app/loadingScreen" 
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BidFavoriteButton = ({bid}) => {
    const [isLoading, setLoading] = useState(false)
    const [isFavorite, setIsFavorite] = useState(bid.favorite)
    const [favoriteId, setFavoriteId] = useState(bid.favorite_id)
    // console.log(isFavorite)
    const handleFavorite = async () => {
    //   console.log(bid)
      setLoading(true);
      
      try {
        const formData = new FormData()
        formData.append('vendor_id',bid.vendor_id);
        formData.append('manager_id',bid.manager_id);
        const favouriteRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}favourite?token=${getCookie('token')}`,{
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
        setFavoriteId(dataProp.data.id);
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
        setLoading(false)
        setIsFavorite(1)
        // console.error(requestsQuotes)
        
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
        setLoading(false)
        setIsFavorite(0)
      }
    }
    
    const handleRemoveFavorite = async () => {
    //   console.log(bid.favorite_id)
      setLoading(true);
      
      try {
        const formData = new FormData()
        const favouriteRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}favourite/${favoriteId}`,{
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
        setLoading(false)
        setIsFavorite(0)
        // console.error(requestsQuotes)
        
      } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
        setLoading(false)
        setIsFavorite(1)
      }
    }

    return isFavorite==1 ? <Button type="button" className="bg-[#c1272d] text-white p-2" onClick={handleRemoveFavorite} severity="info" rounded> {isLoading ? <Loading /> : "Remove from favorite"}  </Button> :<Button type="button" className="bg-[#c1272d] text-white p-2" onClick={handleFavorite} severity="info" rounded> {isLoading ? <Loading /> : "Add To favorite"}  </Button>;
}

export default BidFavoriteButton;
