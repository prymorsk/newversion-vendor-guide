"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "@/hooks/useForm";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userAllInfo, setUserAllInfo] = useState(null);
  const [sitesetting, setSiteSetting] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
  const [isInfoLoding, setIsInfoLoding] = useState(true);
  const [loading, setLoading] = useState(true);

  const { renderFieldError, navigate } = useForm();

  /* ------------------ Load common site data ------------------ */
  useEffect(() => {
    const loadCommonData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}site_setting`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}post-meta`),
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();

        setSiteSetting(data1.data);
        setMetaData(data2.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsInfoLoding(false);
      }
    };

    loadCommonData();
  }, []);

  /* ------------------ Load user info if token exists ------------------ */
  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const loadUserInfo = async () => {
      try {
        setIsLoding(true);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        axios.defaults.headers.common.token = token;

        const res = await axios.post("user-info");

        if (res.data?.success) {
          const type = res.data.data.type;

          if (type === 1) setUser(res.data.data.managers);
          if (type === 0) setUser(res.data.data.vendor);
          if (type === 2) setUser(res.data.data.company);

          setUserAllInfo(res.data.data);
          setIsLogin(true);
        }
      } catch {
        logout();
      } finally {
        setIsLoding(false);
        setLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  /* ------------------ Auth Actions ------------------ */
  const login = async (formData) => {
    try {
      setIsLoding(true);
      const resulsts = await axios.post("auth/login", formData);

      const res = resulsts.data;

         console.log('type ..............');
        console.log(resulsts);
        console.log(res);
        console.log(res.data);
        console.log(res.data.data);
        console.log(res.data.data.id);



   console.log('type .............. end');

      if (res.success) {
        // Correct destructure according to API response
        const token = res.data.token; // top level
        const type = res.data.data.type; // inside data

     

        // Set cookies
        setCookie("token", token, { maxAge: 3600, path: "/", sameSite: "lax" });
        setCookie("user-type", type, { maxAge: 3600, path: "/", sameSite: "lax" });

        // Update state
        setIsLogin(true);
        setUserAllInfo(res.data.data);

        // Show toast first, then redirect
        toast.success(res.data.message);

        setTimeout(() => {
          if (type === 1) window.location.href = "/manager/dashboard";
          if (type === 0) window.location.href = "/vendor/dashboard";
          if (type === 2) window.location.href = "/company/dashboard";
        }, 500); // delay ensures toast shows
      }
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoding(false);
    }
  };

  const logout = () => {
    deleteCookie("token");
    deleteCookie("user-type");
    deleteCookie("isSubscribe");

    setUser(null);
    setUserAllInfo(null);
    setIsLogin(false);

    // Force full navigation
    window.location.href = "/login";
  };

  const handleErrors = (error) => {
    const errors = error?.response?.data?.data;
    if (errors) {
      Object.values(errors).forEach((msg) =>
        toast.error(msg[0], { theme: "colored" })
      );
    } else if (error?.response?.data?.message) {
      toast.error(error.response.data.message, { theme: "colored" });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userAllInfo,
        sitesetting,
        metaData,
        isLogin,
        isLoding,
        isInfoLoding,
        loading,
        login,
        logout,
        renderFieldError,
        navigate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useAuth() {
  return useContext(UserContext);
}
