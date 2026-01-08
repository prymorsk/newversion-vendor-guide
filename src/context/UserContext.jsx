"use client";
import React, { createContext, use, useContext, useEffect, useState } from 'react';
//import axios from 'axios'; // Import Axios properly
import axios from '@/lib/axios';
import { setCookie,getCookie,deleteCookie,hasCookie } from 'cookies-next';
import { NextResponse } from 'next/server';
import {useForm} from "@/hooks/useForm";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserContext = createContext();

export function UserProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userAllInfo, setUserAllInfo] = useState(null);
  const [sitesetting, setSiteSetting] = useState();
  const [metaData, setMetaData] =useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
  const [isInfoLoding, setIsInfoLoding] = useState(true);
  const [loading, setLoading] = useState(true);
  // const [formErrors, setFormErrors] = useState(false);
  const token = getCookie('token');
  const is_module_type = getCookie('type');
  
  const { errors,setErrors, renderFieldError, navigate } = useForm();

  useEffect(() => {
    const loadUserCommonInfo = async () => {
  
      try {
        const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}website_setting`, {
          method: 'GET',
        });
        // console.log('done');
        if (!response2.ok) {
          throw new Error('Failed to submit the data. Please try again.');
        }
        // Handle response if necessary
        const dataProp = await response2.json();
        // console.log(dataProp.data);
        setSiteSetting(dataProp?.data); 
      } catch (error) {
        console.error(error)
      }
    
    }
    loadUserCommonInfo();
    setIsInfoLoding(false);

    const  loadMetaData = async () =>{
      try{
        const response22 =  await fetch(`${process.env.BASE_API_URL}post-meta`,{
          method:'GET'
        });
        if (!response22.ok) {
          throw new Error('Failed to submit the data. Please try again.');
        }
          const dropData1 = await response22.json();
          // console.log(dropData);
          setMetaData(dropData1.data);
          setLoading(false);
      }catch (error){
        console.error(error);
      }
    }
    loadMetaData();
    
  },[]);

  useEffect(() => {
    const userInfo = async (formData) => {
    
      setIsLoding(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
    axios.defaults.headers.common['token'] = `${getCookie('token')}`;
     if(formData)
     {
     formData.append('token',getCookie('token'));
     }

      await axios.post(`user-info`, formData).then(response => {
          const res = response.data;
      
      
      //console.log('users data all check...');

      //console.log(res.data);
      // console.log('users data all check not reflecting...');
      
          setIsLoding(false);
          if(res.success==true) {
              // deleteCookie('token')
              // deleteCookie('name')
              // deleteCookie('user-type')
              // deleteCookie('isSubscribe')
              setCookie('token', res.data.token,{maxAge: 3600 });
              setCookie('user-type', res.data.data.type,{maxAge: 3600 });
              setCookie('isSubscribe', res.data.data?.vendor?.subscriptions?.stripe_status,{maxAge: 3600 });
              
              if(res.data.data.type==1){
                setUser(res.data.data.managers)
              }
              if(res.data.data.type==0)
              {
                setUser(res.data.data.vendor)
              }
              if(res.data.data.type==2){
                setUser(res.data.data.company)
              }
              setUserAllInfo(res.data.data);
          }
      }).catch(error => {

          setIsLoding(false);
          // console.log('users data all errors...');
           //console.log(error?.response?.data?.message);
           //console.log(error?.response?.data?.message);
          if(error?.response?.data?.message=="Unauthenticated"){
            if(hasCookie('token')){
              deleteCookie('token')
              deleteCookie('user-type')
              deleteCookie('isSubscribe')
              setUser(null); 
              router.push(`/login`);
            }
          }
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
    if(hasCookie('token')){
      userInfo();
    }
    setIsLoding(false);
  }, []);

  const forgetpassword = async (formData) => {
    setIsLoding(true);
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
  
    await axios.post(`forget-password`, formData).then(response => {
        // console.log(response.data.data);
        const res = response.data;

        if (res.status === 429) {
          // Handle rate limit exceeded, maybe implement retry logic
          console.warn('Rate limit exceeded. Retry after some time.');
          return null; // or throw an error
      }


        setIsLoding(false);
        if(res.status==true) {
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

  const resetpassword = async (formData) => {
    setIsLoding(true);
    
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
  axios.defaults.headers.common['token'] = `${getCookie('token')}`;
     if(formData){
   formData.append('token',getCookie('token'));
   }
    
    await axios.post(`reset-password`, formData).then(response => {
        //
        const res = response.data;
        // console.log(res);


        if (res.status === 429) {
          // Handle rate limit exceeded, maybe implement retry logic
          console.warn('Rate limit exceeded. Retry after some time.');
          return null; // or throw an error
      }
        setIsLoding(false);

        if(res.status==true) {
          if(hasCookie('token')){
            deleteCookie('token')
            deleteCookie('user-type')
            setUser(null); 
            router.push(`/login`);
          }
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
             
        }else if(res.status==false){
          toast.error(res.message, {
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

    }).catch(error => {
        setIsLoding(false);
        //console.log(error.response.data);
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

  const register = async (formData) => {
    setIsLoding(true);
    await axios.post(`auth/register`, formData).then(response => {
        // console.log(response.data.data);
        if (response.data.status === 429) {
          // Handle rate limit exceeded, maybe implement retry logic
          console.warn('Rate limit exceeded. Retry after some time.');
          return null; // or throw an error
      }
        setIsLoding(false);
        if(response.data.success==true) {
            
            
             toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            
            
            
            
            
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
        if (res.status === 429) {
          // Handle rate limit exceeded, maybe implement retry logic
          console.warn('Rate limit exceeded. Retry after some time.');
          return null; // or throw an error
      }
        if(res.success==true) {
            deleteCookie('token')
            deleteCookie('name')
            deleteCookie('user-type')
            deleteCookie('isSubscribe')
            setCookie('token', res.data.token,{maxAge: 3600 });
            setCookie('user-type', res.data.data.type,{maxAge: 3600 });
            setCookie('isSubscribe', res.data.data?.vendor?.subscriptions?.stripe_status,{maxAge: 3600 });
            // setUser(res.data.data)
            // router.push(`/`);
            setUserAllInfo(res.data.data)
            if(res.data.data.type==1){
              setUser(res.data.data.managers)
              router.push(`/manager/dashboard`);
            }
            if(res.data.data.type==0){
              setUser(res.data.data.vendor);
              router.push(`/vendor/dashboard`);
            }
            if(res.data.data.type==2){
              setUser(res.data.data.company);
              router.push(`/company/dashboard`);
            }
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
        }
        setIsLoding(false);
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

  const updateprofile = async (formData) => {
      
    setIsLoding(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie('token')}`;
  axios.defaults.headers.common['token'] = `${getCookie('token')}`;
if(formData){
   formData.append('token',getCookie('token'));
   }  
        await axios.post(`user-profile-update`, formData).then(response => {
            // console.log(response);
            setIsLoding(false);
            // onClose(true)
            // if(response.data.success == true){
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
              // }
        }).catch(error => {
            setIsLoding(false);
            if(error?.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        });
    
    
    
  };

  const logout = (e) => {
    e.preventDefault();
    if(hasCookie('token')){
      deleteCookie('token')
      deleteCookie('user-type')
      deleteCookie('isSubscribe')
      setUser(null); 
      setUserAllInfo(null); 
      router.push(`/login`);
    }
  };

  return (
    <UserContext.Provider value={{user,isLogin,register,login,logout,renderFieldError,forgetpassword,resetpassword,updateprofile,isLoding,isInfoLoding,navigate,sitesetting,metaData,loading,userAllInfo}}>
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  return useContext(UserContext);
}
