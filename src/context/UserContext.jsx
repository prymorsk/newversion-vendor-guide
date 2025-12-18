"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "@/hooks/useForm";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userAllInfo, setUserAllInfo] = useState(null);
  const [sitesetting, setSiteSetting] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoding, setIsLoding] = useState(false);
  const [isInfoLoding, setIsInfoLoding] = useState(true);
  const [loading, setLoading] = useState(true);

  const { setErrors, renderFieldError, navigate } = useForm();

  /* ------------------ Load common site data ------------------ */
  useEffect(() => {
    const loadCommonData = async () => {
      try {
        const res1 = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}site_setting`
        );
        const data1 = await res1.json();
        setSiteSetting(data1.data);

        const res2 = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}post-meta`
        );
        const data2 = await res2.json();
        setMetaData(data2.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsInfoLoding(false);
        setLoading(false);
      }
    };

    loadCommonData();
  }, []);

  /* ------------------ Load user info if token exists ------------------ */
  useEffect(() => {
    if (!hasCookie("token")) return;

    const loadUserInfo = async () => {
      try {
        setIsLoding(true);

        axios.defaults.headers.common.Authorization = `Bearer ${getCookie(
          "token"
        )}`;
        axios.defaults.headers.common.token = getCookie("token");

        const res = await axios.post("user-info");

        if (res.data?.success) {
          setCookie("token", res.data.data.token, { maxAge: 3600 });
          setCookie("user-type", res.data.data.type, { maxAge: 3600 });
          setCookie(
            "isSubscribe",
            res.data.data?.vendor?.subscriptions?.stripe_status,
            { maxAge: 3600 }
          );

          if (res.data.data.type === 1)
            setUser(res.data.data.managers);
          if (res.data.data.type === 0)
            setUser(res.data.data.vendor);
          if (res.data.data.type === 2)
            setUser(res.data.data.company);

          setUserAllInfo(res.data.data);
          setIsLogin(true);
        }
      } catch (error) {
        if (error?.response?.data?.message === "Unauthenticated") {
          logout();
        }
      } finally {
        setIsLoding(false);
      }
    };

    loadUserInfo();
  }, []);

  /* ------------------ Auth Actions ------------------ */

  const login = async (formData) => {
    try {
      setIsLoding(true);
      const res = await axios.post("auth/login", formData);

      if (res.data.success) {
        deleteCookie("token");
        deleteCookie("user-type");
        deleteCookie("isSubscribe");

        setCookie("token", res.data.data.token, { maxAge: 3600 });
        setCookie("user-type", res.data.data.type, { maxAge: 3600 });

        setUserAllInfo(res.data.data);

        if (res.data.data.type === 1) {
          setUser(res.data.data.managers);
          router.push("/manager/dashboard");
        }
        if (res.data.data.type === 0) {
          setUser(res.data.data.vendor);
          router.push("/vendor/dashboard");
        }
        if (res.data.data.type === 2) {
          setUser(res.data.data.company);
          router.push("/company/dashboard");
        }

        toast.success(res.data.message);
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
    router.push("/login");
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
        register: null,
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
