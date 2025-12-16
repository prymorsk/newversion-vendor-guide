import axios from '@/lib/axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const StripeForm = ({ secret,plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

// console.log(secret);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { setupIntent, error } = await stripe.confirmCardSetup(secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.cardHolderName.value,
        },
      },
    });

    if (error) {
      // console.error(error);
      toast.error(error?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    } else {
      // Handle the success case, e.g., submit the form with the setupIntent.payment_method
      // console.log(setupIntent.payment_method);
      var formData = new FormData(e.target);
      formData.append('token',setupIntent.payment_method);
      formData.append('plan',plan?.id);
      axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
      await axios.post(`plan/payment-now`,formData).then(response => {
          // console.log(response.data);
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
          setLoading(false);
          router.push(`/vendor/dashboard`);
      }).catch(error => {
        setLoading(false);
        var errors = error?.response?.data?.data;
        if(errors){
            const errorArray = Object.keys(errors).map((key) => {
                toast.error(errors[key][0], {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                
            });
        }else if(error?.response?.data?.message){
            toast.error(error?.response?.data?.message, {
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
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-12 mb-4 items-center  ">
        <div className="col-span-12 lg:col-span-12 mb-4 relative float-label-input">
            <input type="text" name="cardHolderName" id='fullname' className="w-full  placeholder:text-sm border-solid border-2 border-black  p-2 text-[0.55rem] md:text-[0.77rem]" placeholder="" />
            <label htmlFor="fullname" className="absolute top-2 left-0 text-black pointer-events-none transition duration-200 ease-in-outbg-white px-3 text-grey-darker font-bold  text-[0.55rem]  md:text-[0.77rem]"
            >Card Holder Name</label>
        </div>
      </div>
      <CardElement />
      <div className="block text-center pt-4">
        <button type="submit"  className="px-10 lg:px-6 md:px-5 py-2 text-center flex-none rounded-md bg-[#B13634] lg:text-[1.3rem] md:text-lg text-sm tracking-wide font-normal font-lato text-white shadow-sm hover:bg-[#B13634] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#221F20]" disabled={loading}>
            Pay {loading && <FontAwesomeIcon icon={faSpinner} spin /> }
        </button>
      </div>
      
    </form>
  );
};

export default StripeForm;