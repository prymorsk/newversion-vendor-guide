import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeForm from '@/app/(front)/plan/[slug]/StripeForm';
import { getCookie } from "cookies-next";
import axios from "@/lib/axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function StripSubscriptionForm({ currentSlug, user }) {
    const [headerData, setHeaderData] = useState([]);
    const [paymentIntent, setPaymentIntent] = useState([]);
    const [plan, setPlan] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const loadpackage = async () => {
            try {
                const responseData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}package`, {
                    method: "GET",
                });
                if (!responseData.ok) {
                    throw new Error('Failed to fetch the data. Please try again.');
                }
                const dropdata = await responseData.json();

                setHeaderData(dropdata.data.header);
            } catch (error) {
                console.error(error);
            }
        };

        loadpackage();

        const paymentintent = async () => {

           const token= axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
            console.log('token in strip', token)
            await axios.get(`plan/${currentSlug}`).then(response => {
              
                setPaymentIntent(response.data.intent);
                setPlan(response.data.plan);
                console.log('paln data=', response.data.plan);

            }).catch(error => {
                if (error?.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                    console.log('error', error);
                }
            });
        };

        paymentintent();
    }, []);
    // console.log('paln data=', plan);
    console.log('paln price P=', plan.Price);
    console.log('paln price =', plan.price);
    console.log('paln tile=', plan.title);
    function onSelectHandle(e) {
        router.push(`${e.target.value}`);
        // console.log(e.target.value);
    }

    return (
        <div className="md:col-span-1 col-span-12   order-1 sm:order-2  sm:gap-x-5 lg:ps-24">
            <div className=" rounded-2xl overflow-hidden  flex flex-col  bg-white">
                <div className=" items-center p-3 bg-[#B13634]">
                    <p className="text-center text-white font-medium lg:text-2xl md:text-lg md:text-2xl tracking-wide">Get Started Today</p>
                </div>
                <div className="lg:px-8 px-3 lg:pb-8 pb-3  lg:pt-5 pt-2">
                    <div className="grid grid-cols-12 mb-4 items-center  ">
                        <div className="col-span-12 lg:col-span-12 mb-2">
                            <h3 className="md:mt-0 mt-0 md:leading-6 leading-5 md:text-[1.02rem] text-sm text-[#221F20] font-bold  font-maven">
                                Take the next step in advertising with Vendor Guide!
                            </h3>
                            <p className="md:mt-0 mt-0 md:leading-6 leading-5 md:text-[1.02rem] text-sm text-[#221F20] font-medium  font-maven">
                                Share your partnership interests through the htmlForm below and we'll create a winning advertising plan that’s best htmlFor you!
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mb-4 items-center  ">
                        <div className="col-span-12 lg:col-span-12 mb-2">
                            <select
                                name="package"
                                className=" w-full border-2  border-[#171717]  py-2.5 md:text-[0.77rem] text-[0.55rem] px-2 text-[#171717] font-bold focus:border-[#171717]"
                                onChange={onSelectHandle}
                                value={currentSlug}
                            >
                                {headerData?.slug?.map((slug, i) => (
                                    <option key={i} className="text-sm text-[#171717] font-bold bg-white" value={slug} >{slug}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mb-3 items-center  border-b-2 border-[#221F20]">
                        <div className="col-span-12 lg:col-span-12 mb-4">
                            <div className="grid grid-cols-4 text-sm md:text-[1.09rem] text-[#B13634]  font-bold font-lato">
                                <div className="col-span-3 pb-2">
                                    {plan.title} Package x 1 Month
                                </div>
                                <div className="col-span-1 text-center">
                                    ${plan.price}
                                </div>
                            </div>
                            <p className="md:mt-0 mt-0 md:leading-6 leading-5 md:text-[1.02rem] text-sm text-[#221F20] font-medium  font-maven">
                                Includes Tier 1 Rank Priority, Company Logo,12 photos, Request Bid, and Web Link
                                htmlFor one year
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 items-center ">
                        <div className="col-span-2">
                            <h2 className="text-right font-bold text-[#221F20] md:text-[1.08rem] text-sm">
                                Sub Total: ${plan.price}
                            </h2>
                        </div>
                    </div>
                    <h4 className="text-left text-[#221F20] md:text-lg text-sm font-semibold mb-3 -tracking-tight">
                        Payment Details
                    </h4>

                    <Elements stripe={stripePromise}>
                        <StripeForm secret={paymentIntent?.client_secret} plan={plan} />
                    </Elements>

                </div>
            </div>
        </div>
    );
};