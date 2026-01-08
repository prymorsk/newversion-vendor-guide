
import axios from '@/lib/axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import { setCookie,getCookie,deleteCookie,hasCookie } from 'cookies-next';

export const uesAuth = () => {
    const cookieSet = NextResponse.next();
    const [user, setUser] = useState();
    const [isLoding, setIsLoding] = useState(false);
    const router = useRouter()

    const register = async (formData) => {
        setIsLoding(true);
        await axios.post(`auth/register`, formData).then(response => {
            // console.log(response.data.data);
            setIsLoding(false);
            if(response.data.success==true) {
                router.push(`/login`);
                
            }
        }).catch(error => {
            setIsLoding(false);
            // console.log(error.response.data);
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
    };
    
    const login = async (formData) => {
        setIsLoding(true);
        await axios.post(`auth/login`, formData).then(response => {
            const res = response.data;
            // console.log(res.data.data);
            setIsLoding(false);
            if(res.success==true) {
                deleteCookie('token')
                deleteCookie('name')
                deleteCookie('type')
                setCookie('token', res.data.token,{maxAge: 3600 });
                setCookie('name', res.data.data.name,{maxAge: 3600 });
                setCookie('user-type', res.data.data.type,{maxAge: 3600 });
                toast.success(res.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                
                // console.log(getCookie('token'));
                router.push(`/`);
            }
        }).catch(error => {
            setIsLoding(false);
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
    };

    return {
        register,
        login,
        isLoding
    };
};