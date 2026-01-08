import axios from 'axios';
import React,{ createContext } from 'react';
import router from 'next/router';
import {useForm} from "@/hooks/useForm";
const AuthContext = createContext();

export const getUser = async (ctx) => {
  return await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
      headers: ctx?.req?.headers?.cookie ? { cookie: ctx.req.headers.cookie } : undefined,
      withCredentials: true,
    })
    .then((response) => {
      if (response.data) {
        return { status: 'SIGNED_IN', user: response.data };
      } else {
        return { status: 'SIGNED_OUT', user: null };
      }
    })
    .catch((error) => {
      return { status: 'SIGNED_OUT', user: null };
    });
};
export const AuthProvider = (props) => {
  const auth = props.myAuth || { status: 'SIGNED_OUT', user: null };
  const { setErrors, renderFieldError, navigate } = useForm();
  const login = async (email, password) => {
    setErrors(null);
    // Use any auth service methods here
    return await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/manager/login`,
      data: { email, password },
      withCredentials: true,
    })
      .then(() => {
        router.push('/');
        console.log('user signed in');
      })
      .catch((error) => {
        console.error('Incorrect email or password entered.');
        setErrors(error.response.data.data.errors);
      });
  };
  const register = async (email, password) => {
    setErrors(null);
    return await axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL}/manager/register`,
      data: { email, password },
      withCredentials: true,
    })
      .then(function (response) {
        router.push('/');
          console.log('user registered');
      })
      .catch(function (error) {
        console.error(error.message);
        setErrors(error.response.data.data.errors);
      });
  };
  const logout = async () => {
    setErrors(null);
    return await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/manager/logout`, { withCredentials: true })
      .then(() => {
        router.push('/');
        console.log('user logged out');
      })
      .catch((error) => {
        console.error(error.message);
        setErrors(error.response.data.data.errors);
      });
  };
  return <AuthContext.Provider value={{ auth, logout, register, login }} {...props} />;
};
export const useAuth = () => React.useContext(AuthContext);
export const AuthConsumer = AuthContext.Consumer;