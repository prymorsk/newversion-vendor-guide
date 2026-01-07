import '@/app/globals.css'
import '@/app/customstyle.css'
import Footer from '@/components/Layouts/Front/Footer'
import Header from '@/components/Layouts/Front/Header'
import { Fragment, Suspense } from 'react'

import {
  getCategories,
  getMagazines,
  getSiteSetting,
    getSiteSettingnew,

  getBlogs,
  getPages
} from '@/app/lib/server-api'

export default async function AuthLayout({ children }) {

  const [
    categories,
    magazines,
    sitesetting,
    getSiteSettingnew,
    blogs,
    homeBannerText
  ] = await Promise.all([
    getCategories(),
    getMagazines(),
    getSiteSetting(),
        getSiteSettingnew(),

    getBlogs({ cache: 'force-cache' }),
    getPages('home-banner-text', { cache: 'force-cache' })
  ])

  return (
    <Fragment>

      {/* HEADER FIRST – forced */}
      <Suspense fallback={<div className="h-[80px] bg-black" />}>
        <Header
          categories={categories}
          magazines={magazines}
          sitesetting={getSiteSettingnew.data}
        />
      </Suspense>

      {children}

      {/* FOOTER LAST – forced  sup*/}
      <Suspense fallback={null}>
        <Footer
          homeBannerText={homeBannerText?.data}
          blogs={blogs}
          sitesetting={getSiteSettingnew.data}
          nationalads={getSiteSettingnew.nationalads}
        />
      </Suspense>

    </Fragment>
  )
}
