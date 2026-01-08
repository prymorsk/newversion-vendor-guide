"use client";
import AdminLayout from "@/components/Layouts/Admin";
import HomeLayout from "@/components/Layouts/Front/Home";
import { usePathname } from 'next/navigation';
import HomeGuest from "@/components/Layouts/Front/HomeGuest";
import { setCookie,getCookie } from 'cookies-next';
import { useAuth } from "@/context/UserContext";

export default function Template({ children,props }) {
    const {user}  = useAuth();
    const pathName = usePathname();
    const newSplitPathName = pathName.split('/')
    return (
      <>
        
        {
          newSplitPathName[1] ==='admin'?
            <AdminLayout {...props}>
              {children}</AdminLayout>
          :
            newSplitPathName[1] ==='login'?
            <HomeGuest headerType={newSplitPathName[1]} user={user} >{children}</HomeGuest>
            :
            <HomeLayout headerType={newSplitPathName[1]} user={user} >{children}</HomeLayout>
        }
      </>
    )
  }