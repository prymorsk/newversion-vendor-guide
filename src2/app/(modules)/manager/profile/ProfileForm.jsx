"use client";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import Submit from "@/components/Front/UI/Submit";
import { useState } from 'react';
// import SelectDropdown from "./Front/UI/SelectDropdown";
// import TextArea from "./Front/UI/TextArea";
import axios from "axios";
import {useForm} from "@/hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import AddressAutocomplete from "./AddressAutocomplete";

const ProfileForm = ({user,userAllInfo}) => {
  const userDefult = "/images&icons/profile.png";

    const [imageId, setImageId] = useState(user?.image_id);
    const [isImageLoading, setImageIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageSrc, setImageSrc] = useState(user?.image_url);
    const { errors,setErrors, renderFieldError} = useForm();
    const [form, setForm] = useState([]);
    const [users, setUser] = useState(user);
    const [usersInfo, setUserInfo] = useState(userAllInfo);
    const {updateprofile,isLoding} = useAuth();

    
    const makeRequest = async (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        // formData.append('image_id', users.image_id);
        updateprofile(formData);
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
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}image`, {
            method: 'POST',
            body: formData,
          })
          if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.')
          }
     
          // Handle response if necessary
          const data = await response.json()
          setImageId(data.file_id);
          setImageSrc(data.file_path);
          
          setForm({...form, ['image_id']: data.id});
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
        <div className="mx-auto max-w-3xl">

        <div className="w-full  px-8">
            <form action="#" method="POST" id="profile_form" className="mx-auto mt-6" onSubmit={makeRequest}>
                <div className="w-full">
                <div className="w-half my-2 pb-3 sm:pb-6" >
                        
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-4">
                        <div className="col-span-3 mt-2">
                        {isImageLoading ? <div style={{width:'20%',float:'left'}}><FontAwesomeIcon icon={faSpinner} spin /></div> : ''}
                        <img src={imageSrc?imageSrc:userDefult.src} style={{height:'100px',width:'100px'}} className=" rounded-full" />
                       </div>
                        <div className="col-span-9 mt-2.5">
                            {/* <Label label="Have Photos?"  /> */}
                            <Input type="hidden" name="image_id" id="image_id" value={imageId}  />
                            <Input type="file" name="image" id="image" style={{width:'100%',float:'left'}}  onChange={onImageUpload} />
                           
                        </div>
                        
                        {renderFieldError('image_id')}
                        {error && <div className="text-[#c13e27] text-sm font-normal">{error}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-3 sm:pb-6" >
                            <Label label="Name" required="required" />
                            <div className="mt-2.5">
                                <Input name="name" id="name" value={usersInfo.name}  onChange={(e) => { 
                                    var value = e.target.value;
                                    setUserInfo({...usersInfo, name: value})
                                }
                                } />
                            </div>
                            {renderFieldError('first_name')}
                        </div>
                        <div className="col-span-2 sm:col-span-1 my-2 pb-3 sm:pb-6" >
                            <Label label="First Name" required="required" />
                            <div className="mt-2.5">
                                <Input name="first_name" id="first_name" value={users.first_name}  onChange={(e) => { 
                                    var value = e.target.value;
                                    setUser({...users, first_name: value})
                                }
                                } />
                            </div>
                            {renderFieldError('first_name')}
                        </div>
                        <div className="col-span-2 sm:col-span-1 my-2 pb-3 sm:pb-6" >
                            <Label label="Last Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="last_name" id="last_name" value={users.last_name} onChange={(e) => { var value = e.target.value; setUser({...users, last_name: value})}} />
                            </div>
                            {renderFieldError('last_name')}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 sm:col-span-1 my-2 pb-3 sm:pb-6" >
                            <Label label="Email Address" required="required" />
                            <div className="mt-2.5">
                                <Input name="email" id="email" value={users.email} onChange={(e) => { var value = e.target.value;  setUser({...users, email: value})}} disabled />
                            </div>
                            {renderFieldError('email')}
                        </div>
                        <div className="col-span-2 sm:col-span-1 my-2 pb-3 sm:pb-6" >
                            <Label label="Phone Number" required="required" />
                            <div className="mt-2.5">
                                <Input name="mobile" id="phone" value={users.mobile} onChange={(e) => { var value = e.target.value; setUser({...users, mobile: value})}} />
                            </div>
                            {renderFieldError('phone')}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <AddressAutocomplete users ={users}/>
                    </div>
                    <div className="w-half my-2" >
                        <div className="my-4 submit_button">

                            <Submit button="Submit" is_loding={isLoding} disabled={isLoding} />
                        </div>
                    </div>
                </div>
                <div className="mt-2 mb-8" >

                </div>
            </form>
        </div>
        </div>
    );
};

export default ProfileForm;