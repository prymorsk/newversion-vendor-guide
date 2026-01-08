"use client";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import Submit from "@/components/Front/UI/Submit";
import { useEffect, useState } from 'react';
import {useForm} from "@/hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/UserContext";
import TextArea from "@/components/Front/UI/TextArea";
import Select from 'react-select';
import AddressAutocomplete from "./AddressAutocomplete";

const ProfileForm = ({user,userAllInfo}) => {
    const [loding, setLoding] = useState(false);
    const [users, setUser] = useState(user);
    const [imageSrc, setImageSrc] = useState(user?.image_url);
    const [imageId, setImageId] = useState(user?.image_id);
    const [isImageLoading, setImageIsLoading] = useState(false);
    const [isMultiImageLoading, setMultiImageIsLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {errors,setErrors, renderFieldError} = useForm();
    const [form, setForm] = useState([]);
    const [newGalleryIds, setNewGalleryIds] = useState([]);
    const [newGalleryUrls, setNewGalleryUrls] = useState([]);
    const [error, setError] = useState(null);
    const [multiFamilyCheck, setMultiFamilyCheck] = useState(user?.multi_family);
    const [commercialCheck, setCommercialCheck] = useState(user?.commercial);
    const [residentialCheck, setResidentialCheck] = useState(user?.residential);
    const [colourOptions, setColourOptions] = useState([]);
    const [states, setStates] = useState([]);
    const [value, setValue] = useState();
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const handleForm = (name, value) => {
        setForm({...form, [name]: value});
    }
    const {updateprofile,isloding} = useAuth();
    
    useEffect(() => { 
    const categoriesResult = async () => {
        var response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}category`,{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`,
			  'token': `${getCookie('token')}`
          },
            
        })
    
        if (!response2.ok) {
        throw new Error('Failed to submit the data. Please try again.')
        }
        var categoryResult = await response2.json();
        var newColourOptions = categoryResult.data.map((v) => ({
            value: v.id,
            label: v.title
        }));
          
        setColourOptions(newColourOptions);
		
		
		
        setSelectedCategories(users?.categories?.map((v) => ({
            value: v.id,
            label: v.title
        })));
    }
    categoriesResult();

    const statesResult = async () => {
        var response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendor-state-list`,{
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${getCookie('token')}`,
			  'token': `${getCookie('token')}`
          },
            
        })
    
        if (!response2.ok) {
        throw new Error('Failed to submit the data. Please try again.')
        }
        var stateResult = await response2.json();
        var newstateResultOptions = stateResult.data.map((v) => ({
            value: v.id,
            label: v.name
        }));
          
        setStates(newstateResultOptions);
        setSelectedStates(users?.states?.map((v) => ({
            value: v.id,
            label: v.name
        })));
    }
    statesResult();
	
	
    setNewGalleryUrls(users?.vendoreimgedit?.map((v) => ([v.image_url])));
    setNewGalleryIds(users?.vendoreimgedit?.map((v) => ([v.gallery_id])));
    },[]);

    const makeRequest = async (e) => {
        e.preventDefault();
        setErrors(null);
        setLoding(true);
        var formData = new FormData(e.target);
		formData.append('token', getCookie('token'));
        // formData.append('gallery_id[]',newGalleryIds.split(','));
        newGalleryIds?.forEach(id => {
            formData.append('gallery_id[]', id);
        });
        updateprofile(formData); 
		setLoding(false);
        }
    
    // console.log(users);
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
        //   console.log(data.image_url);
        //   console.log(data.id);
        setImageSrc(data.file_path);
        setImageId(data.file_id);
          setUser({
            ...users,
            image_id: data.file_id,
            image_url: data.file_path,
          });
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
    
    async function onMultipleImageUpload(event) {
        event.preventDefault();
        setMultiImageIsLoading(true);
        setError(null);
        setImageSrc(null);
    //   console.log(event.target.files[0]);return true;
        try {
            const formData = new FormData();
            // formData.append('images[]', event.target.files[0]);
            for (const file of event.target.files) {
                formData.append('images[]', file, file.name);
            }
			formData.append('token',getCookie('token'));
      
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}multiple_image`, {
            method: 'POST',
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error('Failed to submit the data. Please try again.');
          }
      
          const responseData = await response.json();
          var imgid = responseData.map(image => image.id);
          var imgurl = responseData.map(image => image.image_url);
		  
		  setNewGalleryIds([...imgid])
          setNewGalleryUrls([...imgurl])
		  
		 
		
		  
		  
         
            // console.log(newGalleryIds);

        } catch (error) {
          setError(error.message);
          console.error(error);
        } finally {
          setError(null);
          setMultiImageIsLoading(false);
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
                            <Input type="hidden" name="image_id" id="image_id" value={imageId}  />
                            <Input type="file" name="image" id="image" style={{width:'100%',float:'left'}}  onChange={onImageUpload} />
                           
                        </div>
                        
                        {renderFieldError('image_id')}
                        {error && <div className="text-[#c13e27] text-sm font-normal">{error}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="First Name" required="required" />
                            <div className="mt-2.5">
                                <Input name="first_name" id="first_name" value={users?.first_name}  onChange={e => {handleForm('first_name',e.target.value);
                                setUser({...users,first_name:e.target.value})}} />
                            </div>
                            {renderFieldError('first_name')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Last Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="last_name" id="last_name" value={users?.last_name} onChange={e => {handleForm('last_name',e.target.value);setUser({...users,last_name:e.target.value})}} />
                            </div>
                            {renderFieldError('last_name')}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Name" required="required" />
                            <div className="mt-2.5">
                                <Input name="name" id="name" value={users?.name}  onChange={e => {handleForm('name',e.target.value);
                                setUser({...users,name:e.target.value})}} />
                            </div>
                            {renderFieldError('name')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Company Name" required="" />
                            <div className="mt-2.5">
                                <Input name="company_name"  id="company_name" value={users?.company_name} onChange={e => {handleForm('company_name',e.target.value);setUser({...users,company_name:e.target.value})}}  />
                            </div>
                            {renderFieldError('company_name')}
                        </div>
                        
                    </div>
                    
                    

                    <div className="grid grid-cols-2 gap-x-4">
                       
                

				     {users?.package.mobile == 1 && (
					   <div className="col-span-1 my-2 pb-6" >
                            <Label label="Phone Number" required="required" />
                            <div className="mt-2.5">
                                <Input name="mobile" id="mobile" value={users?.mobile} onChange={e => {handleForm('mobile',e.target.value);setUser({...users,mobile:e.target.value})}} />
                            </div>
                            {renderFieldError('phone')}
				        </div>)}
						
						
						
						 <div className="col-span-1 my-2 pb-6" >
                            <Label label="Email Address" required="" />
                            <div className="mt-2.5">
                                <Input  id="email" value={userAllInfo?.email} disabled="disabled"/>
                            </div>
                            {renderFieldError('email')}
                        </div>
                        
                        <AddressAutocomplete users ={users}/>
						
						
						    <div className="col-span-2 my-2 pb-6" >
                            <Label label="States" required="" />
							<div className="mt-2.5">
                                <Select
                                    value={selectedStates}
                                    isMulti
                                    name="state_id[]"
                                    options={states}
                                    className="basic-multi-select "
                                    classNamePrefix="select"
                                    onChange={(newstateResultOptions) => {
                                        setSelectedStates([...newstateResultOptions]); // Creates a new array with the selected values
                                    }}
                                />
                            </div>
                            {renderFieldError('state_id')}
                        </div>
						

                    </div>
                    
					
					 <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Category" required="" />

                            <div className="mt-2.5">
                                <Select
                                    value={selectedCategories}
                                    isMulti
                                    name="category_id[]"
                                    options={colourOptions}
                                    className="basic-multi-select "
                                    classNamePrefix="select"
                                    onChange={(selectedOptions) => {
                                        setSelectedCategories([...selectedOptions]); // Creates a new array with the selected values
                                    }}
                                />
                            </div>
                            {renderFieldError('category_id')}
                        </div>
						</div>
                        
                    
                        
                    

                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Short Description" required="required" />
                            <div className="mt-2.5">
                                <TextArea name="short_description" id="short_description" value={users?.short_description}  onChange={e => {handleForm('short_description',e.target.value);
                                setUser({...users,short_description:e.target.value})}} rows={3} />
                            </div>
                            {renderFieldError('short_description')}
                        </div>
						
						 {users?.package.description == 1 && (
						 <div className="col-span-2 my-2 pb-6" >
                            <Label label="Description" required="required" />

                            <div className="mt-2.5">
                                <TextArea name="description" id="description" value={users?.description} onChange={e => {handleForm('description',e.target.value);setUser({...users,description:e.target.value})}} rows={5} />
                            </div>
                            {renderFieldError('description')}
                        </div>
						 )}
						
						
                        
                    </div>

                    
                   

                    {users?.package.website_link == 1 && (
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Website" required="required" />

                            <div className="mt-2.5">
                                <Input name="website_url" id="website_url" value={users?.website_url!='disabled'?users?.website_url:""} onChange={e => {handleForm('website_url',e.target.value);setUser({...users,website_url:e.target.value})}} disabled={users?.website_url=='disabled'?true:false} />
                            </div>
                            {renderFieldError('website_url')}
                        </div>
                    </div>)}

                   {users?.package.youtube_url == 1 && (
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="YouTube URL" required="required" />

                            <div className="mt-2.5">
                                <Input name="youtube_url" id="youtube_url" value={users?.youtube_url!='disabled'?users?.youtube_url:""} onChange={e => {handleForm('youtube_url',e.target.value);setUser({...users,youtube_url:e.target.value})}} disabled={users?.youtube_url=='disabled'?true:false} />
                            </div>
                            {renderFieldError('youtube_url')}
                        </div>
                    </div>)}
                    
                    {users?.package.multi_family == 1 &&  (
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Multi Family" required="required" />
                            <div className="mt-2.5">
                                <Input type="radio" name="multi_family" id="multi_family_yes" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={e => {handleForm('multi_family',e.target.value);
                                setUser({...users,multi_family:e.target.value}); setMultiFamilyCheck(e.target.value); setUser({...users,multi_family_description:""}) }} checked={multiFamilyCheck == 1 ? true : false} /> 
                                <label htmlFor="multi_family_yes" className="ms-2 text-sm font-medium mr-2">Yes</label>

                                <Input type="radio" name="multi_family" id="multi_family_no"  value={0} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={e => {handleForm('multi_family',e.target.value);
                                setUser({...users,multi_family:e.target.value}); setMultiFamilyCheck(e.target.value); setUser({...users,multi_family_description:""}) }} checked={multiFamilyCheck == 0 ? true : false} /> 
                                <label htmlFor="multi_family_no" className="ms-2 text-sm font-medium mr-2">No</label>
                            </div>
                            {renderFieldError('multi_family')}
                        </div>
                        <div className="col-span-2 my-2 pb-6" >
                            <div className="mt-2.5">
                                <TextArea name="multi_family_description" id="multi_family_description" value={users?.multi_family_description} onChange={e => {handleForm('multi_family_description',e.target.value);setUser({...users,multi_family_description:e.target.value})}} rows={5} disabled={multiFamilyCheck == 0 ? true : false} />
                            </div>
                            {renderFieldError('multi_family_description')}
                        </div>
                    </div>)}
                    
                 {users?.package.commercial == 1 &&  (
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Commercial" required="required" />
                            <div className="mt-2.5">
                                <Input type="radio" name="commercial" id="commercial_yes" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={e => {handleForm('commercial',e.target.value);
                                setUser({...users,commercial:e.target.value}); setCommercialCheck(e.target.value);setUser({...users,commercial_description:""}) }} checked={commercialCheck == 1 ? true : false} /> 
                                <label htmlFor="commercial_yes" className="ms-2 text-sm font-medium mr-2">Yes</label>

                                <Input type="radio" name="commercial" id="commercial_no"  value={0} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={e => {handleForm('commercial',e.target.value);
                                setUser({...users,commercial:e.target.value}); setCommercialCheck(e.target.value); setUser({...users,commercial_description:""}) }} checked={commercialCheck == 0 ? true : false} /> 
                                <label htmlFor="commercial_no" className="ms-2 text-sm font-medium mr-2">No</label>
                            </div>
                            {renderFieldError('commercial')}
                        </div>
                        <div className="col-span-2 my-2 pb-6" >
                            <div className="mt-2.5">
                                <TextArea name="commercial_description" id="commercial_description" value={users?.commercial_description} onChange={e => {handleForm('commercial_description',e.target.value);setUser({...users,commercial_description:e.target.value})}} rows={5} disabled={commercialCheck == 0 ? true : false} />
                            </div>
                            {renderFieldError('commercial_description')}
                        </div>
                    </div>)}
                    
                    {users?.package.residential == 1 &&  (
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Residential" required="required" />
                            <div className="mt-2.5">
                                <Input type="radio" name="residential" id="residential_yes" value={1} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={e => {handleForm('residential',e.target.value);
                                setUser({...users,residential:e.target.value}); setResidentialCheck(e.target.value);setUser({...users,residential_description:""}) }} checked={residentialCheck == 1 ? true : false} /> 
                                <label htmlFor="residential_yes" className="ms-2 text-sm font-medium mr-2">Yes</label>

                                <Input type="radio" name="residential" id="residential_no"  value={0} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={e => {handleForm('residential',e.target.value);
                                setUser({...users,residential:e.target.value}); setResidentialCheck(e.target.value);setUser({...users,residential_description:""}) }} checked={residentialCheck == 0 ? true : false} /> 
                                <label htmlFor="residential_no" className="ms-2 text-sm font-medium mr-2">No</label>
                            </div>
                            {renderFieldError('residential')}
                        </div>
                        <div className="col-span-2 my-2 pb-6" >
                            <div className="mt-2.5">
                                <TextArea name="residential_description" id="residential_description" value={users?.residential_description} onChange={e => {handleForm('residential_description',e.target.value);setUser({...users,residential_description:e.target.value})}} rows={5} disabled={residentialCheck == 0 ? true : false} />
                            </div>
                            {renderFieldError('residential_description')}
                        </div>
                    </div>)}

                    {users?.vendoreimgedit != "disabled" && (
                    <div className="w-half my-2 pb-6" >
                        <Label label="Gallery Photos?"  />
                        <div className="grid grid-cols-12 gap-x-4">
                            
                            <div className="col-span-12 mt-2.5">
                                <Input type="file" name="galleryid" id="galleryid" multiple style={{width:'100%',float:'left'}}  onChange={onMultipleImageUpload} />
                            
                            </div>
                            
                        
                        {renderFieldError('gallery_id')}
                        {error && <div className="text-[#c13e27] text-sm font-normal">{error}</div>}
                        </div>
                        <div className="grid grid-cols-12 gap-x-4">
                            {newGalleryUrls && newGalleryUrls.map((src,i)=>(
                                <div className="col-span-2 mt-2" key={i}>
                                    <img src={src} style={{height:'100px',width:'100px'}} className="mx-auto " />
                                </div>
                            ))}
                        </div>
                    </div>)}

                    <div className="w-half my-2" >
                        <div className="my-4">

                            <Submit button="Submit" is_loding={loding} disabled={loding} />
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