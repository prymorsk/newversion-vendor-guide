import { Suspense } from "react";
import { getBlogs, getVendors, getPostMeta, getCategories, getStates, getPages,getWebsiteSetting } from "@/app/lib/server-api";
import HomeComponent from "./homecomponent";
export const dynamic = "force-dynamic";

// Dynamic metadata with caching
export async function generateMetadata({ params }) {
  // Fetch SEO meta with revalidation (cache: 'force-cache' for SSR caching)
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/home`, {
    cache: 'force-cache', // Cache on server, revalidate later
    next: { revalidate: 60 } // Optional: revalidate every 60 seconds
  });

  if (!response.ok) return null;

  const seoMetaData = await response.json();
  const metaData = seoMetaData?.data;

  return {
    alternates: {
      canonical: '/',
      languages: { 'en-US': '/' },
    },
    title: metaData?.title,
    description: metaData?.description,
    openGraph: {
      title: metaData?.title,
      description: metaData?.description,
      url: '/',
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: metaData?.image_url,
          secure_url: metaData?.image_url,
          width: 725,
          height: 405,
          alt: metaData?.title,
        }
      ],
      locale: 'en',
      type: 'website',
    },
    twitter: {
      card: metaData?.title,
      title: metaData?.title,
      description: metaData?.description,
      url: '/',
      images: [metaData?.image_url],
      siteId: process.env.SITE_ID,
    },
  };
}

// Home page with SSR caching and revalidation
export default async function Home() {

  // const vendors = await getVendors({ cache: 'force-cache' });
  

const [
    blogs,
    pageMeta,
    categories,
    states,
    homeBannerText,
    sitesetting
  ] = await Promise.all([
    getBlogs({ cache: 'force-cache' }),
    getPostMeta({ cache: 'force-cache' }),
    getCategories({ cache: 'force-cache' }),
    getStates({ cache: 'force-cache' }),
    getPages('home-banner-text', { cache: 'force-cache' }),
    getWebsiteSetting()
  ]);




  return (
        
<Suspense fallback={<div className="text-center py-10 min-h-[500px] bg-black text-white"></div>}>
    <HomeComponent
      sitesetting={sitesetting}
      homeBannerText={homeBannerText?.data}
      blogs={blogs}
      bannerContent={pageMeta?.data.home}
      categories={categories}
      states={states}
      contractors={sitesetting?.contractors}
    />
    </Suspense>
  );
}
