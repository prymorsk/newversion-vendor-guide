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
import AddressAutocomplete from "@/app/(auth)/register/AddressAutocomplete";

const ProfileForm = ({user}) => {
    
    const [users, setUser] = useState(user);
    // console.log(users);
    const [image_id, setImageId] = useState(user?.image_id);
    const [imageSrc, setImageSrc] = useState(user?.image_url);
    const [isImageLoading, setImageIsLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {errors,setErrors, renderFieldError} = useForm();
    const [form, setForm] = useState([]);
    const [error, setError] = useState(null);
    const {updateprofile,isLoding} = useAuth();

    const makeRequest = async (e) => {
        e.preventDefault();
        var formData = new FormData(e.target);
        updateprofile(formData);
    };

    async function onImageUpload(event) {
        event.preventDefault();
        setImageIsLoading(true);
        setError(null);
        setImageSrc(null);
      
        try {
          const formData = new FormData();
          formData.append('image', event.target.files[0]);
		  formData.append('token', getCookie('token'));
      
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}image`, {
            method: 'POST',
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.');
          }
      
          const data = await response.json();
		  
		  console.log('all data');
             console.log(data);
			 
          setUser({
            ...users,
            image_id: data.file_id,
            image_url: data.file_path,
          });
		  
          setImageId(data.file_id);
		  
          setImageSrc(data.file_path);
		  
          setForm({
            ...form,
            image_id: data.file_id,
          });
		  
        } catch (error) {
          setError(error.message);
          console.error(error);
        } finally {
          setError(null);
          setImageIsLoading(false);
        }
      }

  
    return (
        <section>
        <div className="container mx-auto max-w-3xl">

        <div className="w-full">
            <form action="#" method="POST" className="mx-auto mt-6" onSubmit={makeRequest}>
                <div className="w-full">
                    <div className="w-half my-2 pb-6" >
                        <Label label="Have Photos?"  />
                        <div className="grid grid-cols-12 gap-x-4">
                        <div className="col-span-3 mt-2">
                        {isImageLoading ? <div style={{width:'20%',float:'left'}}><FontAwesomeIcon icon={faSpinner} spin /></div> : ''}
                            {imageSrc &&
                                <img src={imageSrc} style={{height:'100px',width:'100px'}} className="mx-auto rounded-full" />
                            }
                       </div>
                        <div className="col-span-9 mt-2.5">
                            <Input type="hidden" name="image_id" id="image_id" value={image_id}  />
                            <Input type="file" name="image" id="image" style={{width:'100%',float:'left'}}  onChange={onImageUpload} />
                           
                        </div>
                        
                        {renderFieldError('image_id')}
                        {error && <div className="text-[#c13e27] text-sm font-normal">{error}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Title" required="required" />
                            <div className="mt-2.5">
                                <Input name="title" id="title" value={users.title}  onChange={(e) => { 
                                    var value = e.target.value;
                                setUser({...users, title: value})}} />
                            </div>
                            {renderFieldError('title')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Website" required="required" />

                            <div className="mt-2.5">
                                <Input name="website_url" id="website_url" value={users.website_url} onChange={(e) => {var value = e.target.value; setUser({...users, website_url: value})}} />
                            </div>
                            {renderFieldError('website_url')}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Name" required="required" />
                            <div className="mt-2.5">
                                <Input name="name" id="name" value={users.name}  onChange={(e) => {var value = e.target.value;
                                setUser({...users, name: value})}} />
                            </div>
                            {renderFieldError('name')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Short Description" required="required" />
                            <div className="mt-2.5">
                                <Input name="short_description" id="short_description" value={users.short_description}  onChange={(e) => {
                                    var value = e.target.value;
                                setUser({...users, short_description: value})}} />
                            </div>
                            {renderFieldError('short_description')}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Description" required="required" />

                            <div className="mt-2.5">
                                <Input name="description" id="description" value={users.description} onChange={(e) => {var value = e.target.value; setUser({...users, description: value})}} />
                            </div>
                            {renderFieldError('description')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Email Address" required="" />
                            <div className="mt-2.5">
                                <Input  id="email" value={users.email} disabled="disabled"/>
                            </div>
                            {renderFieldError('email')}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Phone Number" required="required" />
                            <div className="mt-2.5">
                                <Input name="mobile" id="phone" value={users.phone} onChange={e => {var value = e.target.value; setUser({...users, phone: value})}} />
                            </div>
                            {renderFieldError('phone')}
                        </div>
						
                    </div>
					
					
					
					
					
                    <div className="w-half my-2" >
                           
                            <div className="mt-2.5">
                            <AddressAutocomplete users ={users}/>
                            
                            </div>
                            {renderFieldError('address')}
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
        </div>
        </section>
    );
};

export default ProfileForm;