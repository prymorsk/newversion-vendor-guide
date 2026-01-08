import '@/app/globals.css'
import '@/app/customstyle.css'
import Footer from '@/components/Layouts/Front/Footer'
import Header from '@/components/Layouts/Front/Header'
import { Fragment} from 'react'
import Image from "next/image";

import { getCategories, getMagazines, getWebsiteSetting } from '@/app/lib/server-api';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();
  const magazines = await getMagazines();
  const sitesetting = await getWebsiteSetting();

  
  return (
    <Fragment>
        <Header categories={categories} magazines={magazines}  sitesetting={sitesetting.data}/>
        <main className='sm:relative'>
          {children}
		  
		 
        </main>
        <Footer  sitesetting={sitesetting.data} nationalads={sitesetting.nationalads} />
    </Fragment>
  )
}
