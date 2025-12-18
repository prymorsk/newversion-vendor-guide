"use client";
import NewRegionalHeader  from '@/components/Layouts/Front/NewRegionalHeader'
import Footer from '@/components/Layouts/Front/Footer'
import Header from '@/components/Layouts/Front/Header2'
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar({ children,sitesetting,categories }) {
    const router = usePathname();
    var newArray = router?.split('/');
    
	//console.log(newArray);
    const [activeTab, setActiveTab] = useState(newArray[2]?newArray[2]:'dashboard');
  return (
    <>
        <Header sitesetting={sitesetting} categories={categories} activeTab={activeTab} setActiveTab={setActiveTab} />
        {children}
        <Footer sitesetting={sitesetting} />
    </>
  )
}
