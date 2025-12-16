"use client";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import Submit from "@/components/Front/UI/Submit";
import TableCheckbox from "@/components/Front/Company/TableCheckbox";
import Link from "next/link";
import { useEffect, useState } from 'react';
import SelectDropdown from "@/components/Front/UI/SelectDropdown";
import TextArea from "@/components/Front/UI/TextArea";
import axios from "axios";
import {useForm} from "@/hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { getCookie } from "cookies-next";
import Select from 'react-select';

const AddForm = ({user,navigate,onClose,states,setPropertieData,propertyTypeData}) => {
    // console.log(propertie)
    
    const [options, setOptions] = useState(['Register New Property']);
    const options2 = ['Multi Family','Commercial Property','Residential Property'];
    const [isLoding, setIsLoding] = useState(false);
    const [propertyLocation, setPropertyLocation] = useState(0);
    const [propertyType, setPropertyType] = useState(options2[0]);
    const [propertyName, setPropertyName] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [image_id, setImageId] = useState("");
    const { errors,setErrors, renderFieldError} = useForm();
    const [form, setForm] = useState({property_type:propertyType});
    const [isImageLoading, setImageIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [imageSrc, setImageSrc] = useState("")
    const [propertyData, setPropertyData] = useState([])

    const handleForm = (name, value) => {
        setForm({...form, [name]: value});
        
    }

    useEffect(() => {
        if(!getCookie('token')){
            navigate.push('/')
        }
    }, [])

    const allResult = async () => {
        try {
            const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}property`,{
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
            'property_name':item.property_name,
            'property_type':item?.property_types?.title,
            'id':item.id,
            }));
            setPropertieData(updatedRows);
            // console.error(requestsQuotes)
        } catch (error) {
            // Capture the error message to display to the user
            console.error(error)
        }
    }
    
    const makeRequest = async (e) => {
        e.preventDefault();
        // console.log(form);
        setErrors(null);
        setIsLoding(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`; // Set the Authorization header for Axios
		
	   axios.defaults.headers.common['token'] = `${getCookie('token')}`; // Set the Authorization header for Axios

        var formData = new FormData(e.target);
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}property`, formData).then(response => {
            setIsLoding(false);
            onClose(true);
            allResult()
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

        }).catch(error => {
            setIsLoding(false);
            if(error?.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        });


    };

    
    
    async function onImageUpload(event) {
        event.preventDefault()
        setImageIsLoading(true)
        setError(null) // Clear previous errors when a new request starts
        setImageSrc(null);
        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`; // Set the Authorization header for Axios
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
          //setImageSrc(data.image_url)
          //setImageId(data.id);
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
                    <div className="w-full my-2 pb-6" >
                        <Label label="Property Type" required="required" />

                        <div className="mt-2.5">
                            <Select
                                    name="property_type"
                                    options={propertyTypeData}
                                    className="basic-multi-select "
                                    classNamePrefix="select"
                                />
                        </div>
                        {renderFieldError('property_type')}
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Property Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" id="property_name" value={propertyName} onChange={e => {handleForm('property_name',e.target.value);setPropertyName(e.target.value); }} />
                            </div>
                            {renderFieldError('property_name')}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="State" required="required" />

                            <div className="mt-2.5">
                                <Select
                                    name="state"
                                    options={states}
                                    className="basic-multi-select "
                                    classNamePrefix="select"
                                />
                            </div>
                            {renderFieldError('state')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="City" required="required" />

                            <div className="mt-2.5">
                                <Input name="city" id="city" value={city} onChange={e => {handleForm('city',e.target.value);setCity(e.target.value)}} />
                            </div>
                            {renderFieldError('city')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Zip Code" required="required" />

                            <div className="mt-2.5">
                                <Input name="zip_code" id="zip_code" value={zipCode} onChange={e => {handleForm('zip_code',e.target.value);setZipCode(e.target.value)}} />
                            </div>
                            {renderFieldError('zip_code')}
                        </div>
                    </div>
                    <div className="w-half my-2 pb-6" >
                        <Label label="Street Address" required="required" />

                        <div className="mt-2.5">
                            <TextArea name="address" id="address" value={address} onChange={e => {handleForm('address',e.target.value);setAddress(e.target.value)}} />
                        </div>
                        {renderFieldError('address')}
                    </div>
                    <div className="w-half my-2 pb-6" >
                        <Label label="Address Line 2"  />

                        <div className="mt-2.5">
                            <TextArea name="address_2" id="address2" value={address2} onChange={e => {handleForm('address_2',e.target.value);setAddress2(e.target.value)}} />
                        </div>
                        {renderFieldError('address_2')}
                    </div>
                    <div className="w-half my-2 pb-6" >
                        <Label label="Have Photos?"  />
                        <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 mt-2.5">
                            <Input type="hidden" name="image_id" id="image_id" value={image_id}  />
                            <Input type="file" name="image" id="image" style={{width:'80%',float:'left'}}  onChange={onImageUpload} />
                            {isImageLoading ? <div style={{width:'20%',float:'left'}}><FontAwesomeIcon icon={faSpinner} spin /></div> : ''}
                            {imageSrc &&
                                <img src={imageSrc} style={{width:'20%',float:'left',height:'54px'}} className="pl-5" />
                            }
                        </div>
                        <div className="col-span-2 mt-2">
                        {renderFieldError('image_id')}
                        {error && <div className="text-[#c13e27] text-sm font-normal">{error}</div>}
                        </div>
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