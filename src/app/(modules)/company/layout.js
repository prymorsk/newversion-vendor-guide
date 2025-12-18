import '@/app/globals.css'
import '@/app/customstyle.css'
import Footer from '@/components/Layouts/Front/Footer'
import Header from '@/components/Layouts/Front/Header'
import { Fragment} from 'react'
import Image from "next/image";

import { getCategories, getMagazines, getSiteSetting,getBlogs,getPages } from '@/app/lib/server-api';

export default async function CompanyLayout({ children }) {
  const categories = await getCategories();
  const magazines = await getMagazines();
  const sitesetting = await getSiteSetting();
  const blogs = await getBlogs({ cache: 'force-cache' });
  const homeBannerText = await getPages('home-banner-text', { cache: 'force-cache' });


  
  return (
    <Fragment>

        <Header categories={categories} magazines={magazines}  sitesetting={sitesetting.data}/>
      
          {children}
      
       
        <Footer  homeBannerText={homeBannerText?.data}
      blogs={blogs}  sitesetting={sitesetting.data} nationalads={sitesetting.nationalads} />
      
    </Fragment>
  )
}
