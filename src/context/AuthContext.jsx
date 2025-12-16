import React, { createContext, useContext } from 'react';
import axios from '@/lib/axios';

// Use consistent names for context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const register = async (formData) => {
    try {
      // setErrors(null);
      // setIsLoding(true);
      await axios.post('auth/register', formData);
      // setIsLoding(false);
    } catch (error) {
      console.error(error.message);
      // setErrors(error.response.data.data.errors);
      // toast.error(errors, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
    }
  };

  return (
    <AuthContext.Provider value={{ register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Use consistent names for context
export function useAuth() {
  return useContext(AuthContext);
}
