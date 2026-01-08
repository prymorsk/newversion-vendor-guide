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

const VendorContactMailForm = ({vendor_id,onClose}) => {
    
	
    
    const [isLoding, setIsLoding] = useState(false);
    const [subject, setSubject] = useState('');
	const [username, setUsername] = useState('');
	const [useremail, setUseremail] = useState('');
	const [companyname, setCompanyname] = useState('');
    const [message, setMessage] = useState('');
    const { errors,setErrors, renderFieldError} = useForm();
    const [form, setForm] = useState({username:username,useremail:useremail,companyname:companyname,subject:subject,message:message,vendor_id:vendor_id});
    const [error, setError] = useState(null)
    
    const handleForm = (name, value) => {
        setForm({...form, [name]: value});
        
   }
    
 
    
    
    const makeRequest = async (e) => {
        e.preventDefault();
        // console.log(vendorIds);
        setErrors(null);
        setIsLoding(true);
        var formData = new FormData(e.target);
        
        if(getCookie('user-type') === 0){
            formData.append('status',0);
        }if(getCookie('user-type') === 1){
            formData.append('status',1);
        }else{
            formData.append('status',2);
        }
        //axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
		//axios.defaults.headers.common['token'] = `${getCookie('token')}`;

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}sendmail-vendor-detailpage`,formData).then(response => {
            
        
			    if(response.data.status==false) {
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

   


    return (

        <div className="w-full">
            <form action="#" method="POST" id="myForm" className="mx-auto mt-6" onSubmit={makeRequest}>
			<Input type="hidden" name="vendor_id" id="vendor_id" value={vendor_id} />   
                <div className="w-full">
                    
					
					 <div className="col-span-1 my-2 pb-6" >
                            <Label label="Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="username" id="username" value={username}  onChange={e => {handleForm('username',e.target.value);
                                setUsername(e.target.value)}}  
                                    />
                            </div>
                            {renderFieldError('username')}
                        </div>
					
					
					 <div className="col-span-1 my-2 pb-6" >
                            <Label label="Compnay Name" required="required" />

                            <div className="mt-2.5">
                                <Input name="companyname" id="companyname" value={companyname}  onChange={e => {handleForm('companyname',e.target.value);
                                setCompanyname(e.target.value)}}  
                                    />
                            </div>
                            {renderFieldError('companyname')}
                        </div>
					
					
					 <div className="col-span-1 my-2 pb-6" >
                            <Label label="Email" required="required" />

                            <div className="mt-2.5">
                                <Input name="useremail" id="useremail" value={useremail}  onChange={e => {handleForm('useremail',e.target.value);
                                setUseremail(e.target.value)}}  
                                    />
                            </div>
                            {renderFieldError('useremail')}
                        </div>
					
					
					
					
					
                        <div className="col-span-1 my-2 pb-6" >
                            <Label label="Subject" required="required" />

                            <div className="mt-2.5">
                                <Input name="subject" id="subject" value={subject}  onChange={e => {handleForm('subject',e.target.value);
                                setSubject(e.target.value)}}  
                                    />
                            </div>
                            {renderFieldError('subject')}
                        </div>
                       
                   
                    
                  
                  
                   
                    <div className="w-half my-2 pb-6" >
                        <Label label="Message" required="required" />

                        <div className="mt-2.5">
                            <TextArea name="message" id="address" value={message} onChange={e => {handleForm('message',e.target.value);setMessage(e.target.value)}} 

                                />
                        </div>
                        {renderFieldError('message')}
                    </div>
					
					
                  
                       
                    
                    <div className="w-half my-2" >
                        <div className="my-4">

                            <Submit button="Submit" is_loding={isLoding} disabled={isLoding} />
                        </div>
                    </div>
					
					
					
                </div>
               
            </form>
        </div>
    );
};

export default VendorContactMailForm;
