import { Suspense } from "react";

import Resourcespage from "./Resourcepage";
import { getPostMeta,getMagazineAllData } from "@/app/lib/server-api";
// or Dynamic metadata
export const dynamic = "force-dynamic";

export async function generateMetadata({params}) {
  
  
  //const seoMetaData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/resources`).then((res) => res.json());
 // var metaData = seoMetaData?.data;

const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/resources`);
if (!response.ok) { return null; }
const contentType = response.headers.get('Content-Type');
if (!contentType || !contentType.includes('application/json')) {throw new Error('Invalid Content-Type');}
const clonedResponse = response.clone(); // Clone the response first
const seoMetaData = await response.json();
var metaData = seoMetaData?.data;


  return {
    alternates: {
      canonical: '/blog',
      languages: {
        'en-US': '/blog'
      },
    },
    title: `${metaData?.title}`,
    description: `${metaData?.description}`,
    openGraph:{
      title: `${metaData?.title}`,
      description: `${metaData?.description}`,
      url: `/blog`,
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: `${metaData?.image_url}`,
          secure_url: `${metaData?.image_url}`,
          width: 725,
          height: 405,
          alt: `${metaData?.title}`,
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card:`${metaData?.title}`,
      title: `${metaData?.title}`,
      description: `${metaData?.description}`,
      url: `/blog`,
      images: [`${metaData?.image_url}`],
      siteId: process.env.SITE_ID,
    },
  }
}

export default async function Page({params}){
  const pageMeta = await getPostMeta();
  const magazineAllData = await getMagazineAllData();
  return (
           <Suspense fallback={<div className="text-center py-10 min-h-[500px] bg-black text-white"></div>}>

    <Resourcespage bannerContent={pageMeta?.data.resources}/>
    </Suspense>
  );
};

