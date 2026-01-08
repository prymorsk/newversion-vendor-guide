"use client";
import Label from "@/components/Front/UI/Label";
import Input from "@/components/Front/UI/Input";
import Submit from "@/components/Front/UI/Submit";
import { useEffect, useState } from 'react';
import TextArea from "./Front/UI/TextArea";
import axios from "axios";
import {useForm} from "@/hooks/useForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import { getCookie } from "cookies-next";
import { DatePickerInput } from "./DatePickerInput";

const PropartyForm = ({user,vendor_id,onClose,categoryData,stateData}) => {
    
	
	//console.log('stateData loaded..........');
	//console.log(stateData);
	//console.log('stateData loaded end..........');
	
    //console.log('user loaded..........');
	//console.log(user);
	//console.log('user loaded end..........');
	
	
	
    
    const [priorityOptions, setPriorityOptions] = useState(['High','Medium','Low']);
     //const options2 = ['Multi Family','Commercial Property','Residential Property'];
	 const options2 = ['Multi Family','Commercial Property'];
	
	
    const [isLoding, setIsLoding] = useState(false);
  const namenew=user.name;
  const splitIndex = Math.floor(namenew.length / 2);
  //const firstPart = namenew.substring(0, splitIndex);
  //const secondPart = namenew.substring(splitIndex);

  const [firstPart, ...rest] = namenew.split(' ');
  const secondPart = rest.join(' ');



    const [firstName, setFirstName] = useState(firstPart?firstPart:"");
    const [lastName, setLastName] = useState(secondPart?secondPart:"");
    const [category, setCategory] = useState(0);
    const [propertyLocation, setPropertyLocation] = useState(0);
    const [propertyType, setPropertyType] = useState(options2[0]);
    const [propertyName, setPropertyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [address, setAddress] = useState(user.address?user.address:"");
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState(user.city?user.city:"");
    const [state, setState] = useState(user.state?user.state:"");
	const [state_id, setStateid] = useState(0);
    const [zipCode, setZipCode] = useState(user.postal_code?user.postal_code:"");
    const [mobile, setMobile] = useState(user.mobile?user.mobile:"");
    const [projectType, setProjectType] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDetails, setProjectDetails] = useState('');
    const date2 = new Date();
    date2.setDate(date2.getDate() + 1);
    const year = date2.getFullYear();
    const month = date2.getMonth() + 1; // Adding 1 to get the month in the range 1 to 12
    const day = date2.getDate(); 
    const [closeDate, setCloseDate] = useState(`${day}-${month}-${year}`);
    const [priority, setPriority] = useState('');
    const [image_id, setImageId] = useState('');
    const { errors,setErrors, renderFieldError} = useForm();
    const [form, setForm] = useState({property_id:propertyLocation,property_type:propertyType,vendor_id:vendor_id});
    const [isImageLoading, setImageIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [imageSrc, setImageSrc] = useState(null)
    const [propertyData, setPropertyData] = useState([])
    const [vendorList, setVendorList] = useState([])
    const [vendorIds, setVendorIds] = useState([vendor_id])

    const [optionProperty, setOptionProperty] = useState([]);
// ['Register New Property']
    const handleForm = (name, value) => {
        setForm({...form, [name]: value});
        
   }
    
   const handlePriority = async (e) => {
        handleForm('priority',e.target.value); 
        setPriority(e.target.value);
   }



const handleVendorbystate = async (e) => {
	    var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index];
        var stateName =  optionElement.getAttribute('data-name');
        const state_idnew=e.target.value;
        handleForm('state',stateName); 
        setState(stateName);
		setStateid(state_idnew);
		
		
        if(e.target.value==""){
            setVendorList([]);
            setVendorIds([vendor_id]);
            return;
        }
        // console.log(e.target.value);
        const params = new URLSearchParams();
        params.append('state_id', state_idnew);
        params.append('category_id', category);

        const response3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendor?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
				'token': `${getCookie('token')}`
            },
        });
 
        if (!response3.ok) {
            throw new Error('Failed to submit the data. Please try again.');
        }
        
        // Handle response if necessary
        var dataProp = await response3.json();
        // console.log(singleProparty)
        setVendorList(dataProp.data);
        const extractedVendorIds = dataProp.data.map(vendor => vendor.id);
        // const arrayIds = extractedVendorIds.split(',');
        setVendorIds(prevVendorIds => [...prevVendorIds, ...extractedVendorIds]);
        // console.log(vendorIds);
        
   }

   const handleCategory = async (e) => {
	   
	        setVendorList([]);
            setVendorIds([vendor_id]);
			setStateid(0);
			
        handleForm('category',e.target.value); 
        setCategory(e.target.value);
		return;//now based on state vendor will show
		
		
        if(e.target.value==""){
            setVendorList([]);
            setVendorIds([vendor_id]);
            return;
        }
        // console.log(e.target.value);
        const params = new URLSearchParams();
        params.append('category_id', e.target.value);
        const response3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendor?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getCookie('token')}`,
				'token': `${getCookie('token')}`
            },
        })
 
        if (!response3.ok) {
            throw new Error('Failed to submit the data. Please try again.')
        }
        
        // Handle response if necessary
        var dataProp = await response3.json()
        // console.log(singleProparty)
        setVendorList(dataProp.data);
        const extractedVendorIds = dataProp.data.map(vendor => vendor.id);
        // const arrayIds = extractedVendorIds.split(',');
        setVendorIds(prevVendorIds => [...prevVendorIds, ...extractedVendorIds]);
        // console.log(vendorIds);
        
   }
   
   const handlePropartyLocation = async (e) => {
        handleForm('property_id',e.target.value); 
        setPropertyLocation(e.target.value)
        setPropertyName("")
        setPropertyType("")
        setZipCode("")
        setState("")
        setCity("")
        setAddress("")
        setAddress2("")
        if(e.target.value>0){
            const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}property/${e.target.value}`,{
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
            var singleProparty= dataProp.data;
            // console.log(singleProparty)
            if(singleProparty){
                setPropertyName(singleProparty.property_name)
                setPropertyType(singleProparty.property_type)
                setZipCode(singleProparty.zip_code)
                setState(singleProparty.state)
                setCity(singleProparty.city)
                setAddress(singleProparty.address)
                setAddress2(singleProparty.address_2)
            }
        }
   }


   const darftRequest = async () =>{
    // e.preventDefault();
    setErrors(null);
    setIsLoding(true);
    // Assuming 'myForm' is the ID of your form
    const formElement = document.getElementById('myForm');
    const formData = new FormData(formElement);
    formData.append('status',1);
    formData.append('token',`${getCookie('token')}`)
    // axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}bid`, formData).then(response => {
            // console.log(response.data.data);
            setIsLoding(false);
            // onClose(true)
        }).catch(error => {
            setIsLoding(false);
            if(error?.response?.data?.errors) {
                // setErrors(error.response.data.errors);
                const errorMessages = Object.values(error.response.data.errors)
                    .map(errors => errors.join(', '))
                    .join('<br>');
                toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessages }} />, {
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
    
    
    const makeRequest = async (e) => {
        e.preventDefault();
        // console.log(vendorIds);
        setErrors(null);
        setIsLoding(true);
        var formData = new FormData(e.target);
        formData.append('close_date',closeDate);
        if(getCookie('user-type') === 0){
            formData.append('status',0);
        }if(getCookie('user-type') === 1){
            formData.append('status',1);
        }else{
            formData.append('status',2);
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
		axios.defaults.headers.common['token'] = `${getCookie('token')}`;

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}bid?token=${getCookie('token')}`, formData).then(response => {
            
            //console.log('bid response...........start');
			 //console.log(response);
			 //console.log('bid response...........end');
			 
			     if(response.data.status==false) {
                // setErrors(error.response.data.errors);
                const errorMessages = response.data.msg;
                toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessages }} />, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
					return;
            }
			
			
			
			
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
        }).catch(error => {
            setIsLoding(false);
            if(error?.response?.data?.errors) {
                // setErrors(error.response.data.errors);
                const errorMessages = Object.values(error.response.data.errors)
                    .map(errors => errors.join(', '))
                    .join('<br>');
                toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessages }} />, {
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


    };

    async function onImageUpload(event) {
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

    useEffect(()=>{
        const loadPropertys = async () => {
            // console.log(getCookie('token'));
            const responsePro = await fetch(`${process.env.NEXT_PUBLIC_API_URL}property`,{
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${getCookie('token')}`,
				  'token': `${getCookie('token')}`
              },
            })
      
            if (!responsePro.ok) {
              throw new Error('Failed to submit the data. Please try again.')
            }
      
            // Handle response if necessary
            let pdata = await responsePro.json();
            setOptionProperty(pdata.data);

        }
        loadPropertys();
    },[])


    return (

        <div className="w-full requestpropery"  >
            <form action="#" method="POST" id="myForm" className="mx-auto mt-6" onSubmit={makeRequest}>
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="First Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="first_name" id="first_name" value={firstName}  onChange={e => {handleForm('first_name',e.target.value);
                                setFirstName(e.target.value)}}  
                                    />
                            </div>
                            {renderFieldError('first_name')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Last Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="last_name" id="last_name" value={lastName} onChange={e => {handleForm('last_name',e.target.value);setLastName(e.target.value)}}  
                                    />
                            </div>
                            {renderFieldError('last_name')}
                        </div>
                    </div>
                    <div className="w-full my-2 pb-6" >
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="col-span-2 my-2" >
                                <Label label="Category" required="" />

                                <div className="mt-2.5">
                                    <select name="category_id" value={category} className="w-full bg-gray-200 border border-gray-200 text-[#c13e27] text-lg py-3 px-4 pr-8 mb-3 rounded"  onChange={handleCategory} 

                                        >
                                        <option value="">Select Category</option>
                                        {categoryData && categoryData?.data?.map((row,i)=>{
                                            return(
                                            <option key={i} value={row.id}>{row.title}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                {renderFieldError('category_id')}
                            </div>
							
                        </div>
                    </div>



 <div className="col-span-1 my-2 pb-6" >
                            <Label label="State(Vendors by State)" required="required" />

                                <div className="mt-2.5 hidden">
                                <Input className="hidden " name="state" id="state" value={state}/>  
                                 </div>
                                     
                                <div className="mt-2.5 ">
                                <select name="state_id" id="state_id" className="leading-7 w-full p-1 sm:p-2 lg:p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:outline-none  placeholder-text-lg placeholder-text-gray-900 " value={state_id}
                                onChange={handleVendorbystate} >
                                <option  className=" " value="">Select State</option>
                                {stateData?.map((row,i)=>{
                                return(
                                <option data-name={row.name}  key={i} value={row.id}>{row.name}</option>
                                )
                                })}
                                </select>
                                
                            </div>
                            {renderFieldError('state')}
                        </div>

<div className="w-half my-2 pb-6" >
                        <input type="hidden" name="vendor_id_nouse[]" value={vendor_id} />
                            {vendorList.length > 0 && (
                                <div className="col-span-2 border">
                                    <Label label="Selected Vendors" className={`m-1`} required="" />
                                    <hr />
                                    {vendorList.map((vendor, i) => (
                                    <label
                                        key={i} // It's good to provide a unique key when mapping over arrays
                                        className="inline-flex items-center rounded-md bg-[#c13e27] px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10 m-1"
                                    >
                                        <input type="checkbox" className="w-8 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="vendor_id[]" value={vendor.id} />
                                        <span>{vendor.name}</span>
                                    </label>
                                    ))}
                                </div>
                            )}
                    
                    
                    </div>
                    


                    <div className="w-full my-2 pb-6 hidden " >
                        <Label label="Property Location" required="required" />
                        <div className="mt-2.5">
                            <select name="property_id" value={propertyLocation} className="w-full bg-gray-200 border border-gray-200 text-[#c13e27] text-lg py-3 px-4 pr-8 mb-3 rounded"   

                                >
                                <option key="0" value="0">Register New Property</option>
                               
                            </select>
                        </div>
                        {renderFieldError('property_id')}
                    </div>
                    <div className="w-full my-2 pb-6" >
                        <Label label="Property Type" required="required" />
                        <div className="mt-2.5">
                            <select name="property_type" value={propertyType} className="w-full bg-gray-200 border border-gray-200 text-[#c13e27] text-lg py-3 px-4 pr-8 mb-3 rounded"  onChange={e => {handleForm('property_type',e.target.value);setPropertyType(e.target.value)}} 

                                >
                                {options2 && options2.map((option1,index1) => (
                                    <option key={index1} value={option1}>
                                    {option1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {renderFieldError('property_type')}
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Property Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="property_name" id="property_name" value={propertyName} onChange={e => {handleForm('property_name',e.target.value);setPropertyName(e.target.value)}} 

                                    />
                            </div>
                            {renderFieldError('property_name')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Job Title" required="required" />

                            <div className="mt-2.5">
                                <Input name="job_title" id="job_title" value={jobTitle} onChange={e => {handleForm('job_title',e.target.value);setJobTitle(e.target.value)}} 

                                    />
                            </div>
                            {renderFieldError('job_title')}
                        </div>
                    </div>
                    <div className="w-half my-2 pb-6" >
                        <Label label="Street Address" required="required" />

                        <div className="mt-2.5">
                            <Input name="address" id="address" value={address} onChange={e => {handleForm('address',e.target.value);setAddress(e.target.value)}} 

                                />
                        </div>
                        {renderFieldError('address')}
                    </div>
                    <div className="w-half my-2 pb-6" >
                        <Label label="Address Line 2"  />

                        <div className="mt-2.5">
                            <Input name="address_2" id="address2" value={address2} onChange={e => {handleForm('address_2',e.target.value);setAddress2(e.target.value)}} 

                                />
                        </div>
                        {renderFieldError('address_2')}
                    </div>
                    <div className="grid grid-cols-3 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="City" required="required" />

                            <div className="mt-2.5">
                                <Input name="city" id="city" value={city} onChange={e => {handleForm('city',e.target.value);setCity(e.target.value)}} 

                                    />
                            </div>
                            {renderFieldError('city')}
                        </div>

                       


                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Zip Code" required="required" />

                            <div className="mt-2.5">
                                <Input name="zip_code" id="zip_code" value={zipCode} onChange={e => {handleForm('zip_code',e.target.value);setZipCode(e.target.value)}} 

                                    />
                            </div>
                            {renderFieldError('zip_code')}
                        </div>
                    </div>
					
					
					
					
					
					
					
					
                    <div className="w-half my-2 pb-6" >
                        <Label label="Phone Number" required="required" />

                        <div className="mt-2.5">
                            <Input name="phone" id="phone" value={mobile} onChange={e => {handleForm('phone',e.target.value);setMobile(e.target.value)}} 

                                />
                        </div>
                        {renderFieldError('phone')}
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Project type" required="required" />

                            <div className="mt-2.5">
                                <Input name="project_type" id="project_type" value={projectType} onChange={e => {handleForm('project_type',e.target.value);setProjectType(e.target.value)}} 

                                    />
                            </div>
                            {renderFieldError('project_type')}
                        </div>
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Project Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="project_name" id="project_name" value={projectName} onChange={e => {handleForm('project_name',e.target.value);setProjectName(e.target.value)}} 

                                    />
                            </div>
                            {renderFieldError('project_name')}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 my-2 pb-6" >
                            <Label label="Bid Close Date" required="required" />

                            <div className="mt-2.5">
                                <DatePickerInput closeDate={closeDate} setCloseDate={setCloseDate} 

                                    />
                            </div>
                            {renderFieldError('close_date')}
                        </div>
                    </div>
                    <div className="w-full my-2 pb-6" >
                        <Label label="Priority" required="required" />

                        <div className="mt-2.5">
                            <select name="priority" value={priority} className="w-full bg-gray-200 border border-gray-200 text-[#c13e27] text-lg py-3 px-4 pr-8 mb-3 rounded"  onChange={handlePriority} 

                                >
                                {priorityOptions && priorityOptions.map((option,index) => (
                                    <option key={index} value={option}>
                                    {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {renderFieldError('priority')}
                    </div>
                    <div className="w-half my-2 pb-6" >
                        <Label label="Project Details"  />

                        <div className="mt-2.5">
                            <TextArea name="project_detail" id="project_detail" value={projectDetails} onChange={e => {handleForm('project_detail',e.target.value);setProjectDetails(e.target.value)}} rows="7" 

                                />
                        </div>
                        {renderFieldError('project_detail')}
                    </div>
                    <div className="w-half my-2 pb-6" >
                        <Label label="Have Photos?"  />
                        <div className="grid grid-cols-2 gap-x-4">
                        <div className="col-span-2 mt-2.5">
                            <Input type="hidden" name="image_id" id="image_id" value={image_id}  />
                            <Input type="file" name="image" id="image" style={{width:'80%',float:'left'}}  onChange={onImageUpload} 

                                />
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

export default PropartyForm;
