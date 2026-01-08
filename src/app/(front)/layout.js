import '@/app/globals.css'
import '@/app/customstyle.css'
import Footer from '@/components/Layouts/Front/Footer'
import Header from '@/components/Layouts/Front/Header'
import { Fragment, Suspense } from 'react'

import {
  getCategories,
  getMagazines,
  getSiteSetting,
  getBlogs,
  getPages,
  home_setting
} from '@/app/lib/server-api'

export default async function AuthLayout({ children }) {

  const [
    categories,
    magazines,
    sitesetting,
    blogs,
    homeBannerText,
    home_setting
  ] = await Promise.all([
    getCategories(),
    getMagazines(),
    getSiteSetting({ cache: 'force-cache' }),
    getBlogs({ cache: 'force-cache' }),
    getPages('home-banner-text', { cache: 'force-cache' })
    home_setting()
  ])

  return (
    <Fragment>

      {/* HEADER FIRST – forced */}
      <Suspense fallback={<div className="h-[80px] bg-black" />}>
        <Header
          categories={categories}
          magazines={magazines}
          sitesetting={home_setting?.data}
        />
      </Suspense>

      {children}

      {/* FOOTER LAST – forced  sup*/}
      <Suspense fallback={null}>
        <Footer
          homeBannerText={homeBannerText?.data}
          blogs={blogs}
          sitesetting={home_setting?.data}
          nationalads={home_setting?.nationalads}
        />
      </Suspense>

    </Fragment>
  )
}
