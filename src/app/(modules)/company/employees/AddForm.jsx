"use client";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import Submit from "@/components/Front/UI/Submit";
import { useState } from 'react';
import axios from "axios";
import {useForm} from "@/hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { getCookie } from "cookies-next";
import { useEffect } from "react";

const AddForm = ({onClose,employees,setEmployees}) => {

    const userDefult = "/images&icons/profile.png"

    const [isLoding, setIsLoding] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [mobile, setMobile] = useState('');
    const [image_id, setImageId] = useState("");
    const [isImageLoading, setImageIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const { errors,setErrors, renderFieldError} = useForm();
    const [form, setForm] = useState([]);

    const handleForm = (name, value) => {
        setForm({...form, [name]: value});
        
    }

    const allResult = async () => {
        try {
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}manager`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
				 'token': `${getCookie('token')}`
            },
        })
        if (!response2.ok) {
            throw new Error('Failed to submit the data. Please try again.')
        }
        
        // Handle response if necessary
        var dataProp = await response2.json()
        var newData = dataProp.data;
        const updatedRows = newData.map(item => ({
            'image_url':item.image_url,
            'manager_name':item.name,
            'email':item.email,
            'mobile':item.mobile,
            'manager_type':item.type,
            'id':item.id,
        }));
        setEmployees(updatedRows);
        // console.error(requestsQuotes)
        } catch (error) {
        // Capture the error message to display to the user
        console.error(error)
        }
    }


    const makeRequest = async (e) => {
        e.preventDefault();
        setErrors(null);
        setIsLoding(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`; // Set the Authorization header for Axios
        var formData = new FormData(e.target);
		formData.append('token',getCookie('token'));
        // formData.append('_method','PUT');
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}manager`, formData).then(response => {
            // console.log(response.data);
            setIsLoding(false);
            onClose(true)
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
            allResult()
        }).catch(error => {
            setIsLoding(false);
            console.log(error?.response?.data?.errors)
            if(error?.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        });

        // console.log(e.target);
        // try {
        //     const formData1 = new FormData(e.target)
        //     // formData1.append('test','12');
        //     // console.log(formData1);
        //     const response1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}manager`, {
        //         method: 'POST',
        //         body: formData1,
        //         headers: {
        //             'Authorization': `Bearer ${getCookie('token')}`
        //         },
        //     })
        
        //     if (!response1.ok) {
        //         throw new Error('Failed to submit the data. Please try again.')
        //         setIsLoding(false);
        //         toast.error('Failed to submit the data. Please try again.', {
        //             position: "top-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "colored",
        //         });
        //     }
        
        //     // Handle response if necessary
        //     const data1 = await response1.json()
        //     //   console.log(data.image_url)
        //     setIsLoding(false);
        //     onClose(true)
        //     toast.success(data1.data.msg, {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //     });
        // } catch (error) {
        //     // Capture the error message to display to the user
        //     setError(error.message)
        //     console.error(error)
        //     toast.error(error.errors.email, {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //         });
        // }

    };



    async function onImageUpload(event) {
        // console.log(event);
        event.preventDefault()
        setImageIsLoading(true)
        setError(null) // Clear previous errors when a new request starts
        setImageSrc(null);
        try {
        const formData = new FormData()
        formData.append('image',event.target.files[0]);
		formData.append('token',getCookie('token'));
		
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}image`, {
            method: 'POST',
            body: formData,
        })
    
        if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.')
        }
    
        // Handle response if necessary
        const data = await response.json()
        //   console.log(data.image_url)
        setImageSrc(data.file_path)
        setImageId(data.file_id);
        setForm({...form, ['image_id']: data.file_id});
        // ...
        } catch (error) {
        // Capture the error message to display to the user
        setError(error.message)
        console.error(error)
        } finally {
            setError(null)
            setImageIsLoading(false)
        }
    }


    return (

        <div className="w-full">
            <form action="#" method="POST" className="mx-auto mt-6" onSubmit={makeRequest}>
                <div className="w-full">
                <div className="w-half my-2 pb-6" >
                        
                        <div className="grid grid-cols-12 gap-x-4">
                        <div className="col-span-3 mt-2">
                        {isImageLoading ? <div style={{width:'20%',float:'left'}}><FontAwesomeIcon icon={faSpinner} spin /></div> : ''}
                        {imageSrc && <img src={imageSrc} style={{height:'100px',width:'100px'}} className=" rounded-full" />}
                       </div>
                        <div className="col-span-9 mt-2.5">
                        <Label label="Have Photos?"  />
                            <Input type="hidden" name="image_id" id="image_id" value={image_id}  />
                            <Input type="file" name="image" id="image" style={{width:'100%',float:'left'}}  onChange={onImageUpload} />
                           
                        </div>
                        
                        {renderFieldError('image_id')}
                        {error && <div className="text-[#c13e27] text-sm font-normal">{error}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Name" required="required" />
                            <div className="mt-2.5">
                                <Input name="name" id="name" value={form?.name}  onChange={e => {handleForm('name',e.target.value);}} />
                            </div>
                            {renderFieldError('name')}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="First Name" required="required" />
                            <div className="mt-2.5">
                                <Input name="first_name" id="first_name" value={form?.first_name}  onChange={e => {handleForm('first_name',e.target.value);
                                }} />
                            </div>
                            {renderFieldError('first_name')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Last Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="last_name" id="last_name" value={form?.last_name} onChange={e => {handleForm('last_name',e.target.value);}} />
                            </div>
                            {renderFieldError('last_name')}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Email Address" required="required" />

                            <div className="mt-2.5">
                                <Input name="email" id="email" value={form?.email} onChange={e => {handleForm('email',e.target.value);setEmail(e.target.value)}} />
                            </div>
                            {renderFieldError('email')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Phone Number" required="required" />
                            <div className="mt-2.5">
                                <Input name="mobile" id="mobile" value={form?.mobile} onChange={e => {handleForm('mobile',e.target.value);setMobile(e.target.value)}} />
                            </div>
                            {renderFieldError('mobile')}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Address" required="required" />
                            <div className="mt-2.5">
                            <Input name="address" id="address" value={form?.address} onChange={e => {handleForm('address',e.target.value);setAddress(e.target.value)}} />
                            </div>
                            {renderFieldError('address')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="City" required="required" />
                            <div className="mt-2.5">
                                <Input name="city" id="city" value={form?.city} onChange={e => {handleForm('city',e.target.value);setCity(e.target.value)}} />
                            </div>
                            {renderFieldError('city')}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="State" required="required" />

                            <div className="mt-2.5">
                                <Input name="state" id="state" value={form?.state} onChange={e => {handleForm('state',e.target.value);setState(e.target.value)}} />
                            </div>
                            {renderFieldError('state')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Country" required="required" />
                            <div className="mt-2.5">
                                <Input name="country" id="country" value={form?.country} onChange={e => {handleForm('country',e.target.value);setCountry(e.target.value)}} />
                            </div>
                            {renderFieldError('country')}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                        <Label label="Zip Code" required="required" />
                        <div className="mt-2.5">
                            <Input name="postal_code" id="postal_code" value={form?.postal_code} onChange={e => {handleForm('postal_code',e.target.value);setZipCode(e.target.value)}} />
                        </div>
                        {renderFieldError('postal_code')}
                        </div>
                    </div>
                    <div className="w-half my-2" >
                        <div className="my-4">

                            <Submit button="Submit" is_loding={isLoding} disabled={isLoding} />
                        </div>
                    </div>
                </div>
                <div className="mt-2 mb-8" >

                </div>
            </form>
        </div>
    );
};

export default AddForm;