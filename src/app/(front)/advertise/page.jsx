import { Suspense } from "react";
import Advertisepage from "./Advertisepage";
import { getPostMeta } from "@/app/lib/server-api";
export const dynamic = "force-dynamic";

// or Dynamic metadata
export async function generateMetadata({params}) {
  //const seoMetaData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/advertise`).then((res) => res.json());
  //var metaData = seoMetaData?.data;
  
  
 const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/advertise`);
if (!response.ok) { return null; }
const contentType = response.headers.get('Content-Type');
if (!contentType || !contentType.includes('application/json')) {throw new Error('Invalid Content-Type');}
const clonedResponse = response.clone(); // Clone the response first
const seoMetaData = await response.json();
var metaData = seoMetaData?.data;

  

  return {
    alternates: {
      canonical: `/${metaData?.slug?metaData?.slug:'advertise'}`,
      languages: {
        'en-US': `/${metaData?.slug?metaData?.slug:'advertise'}`
      },
    },
    title: `${metaData?.title}`,
    description: `${metaData?.description}`,
    openGraph:{
      title: `${metaData?.title}`,
      description: `${metaData?.description}`,
      url: `/${metaData?.slug?metaData?.slug:'advertise'}`,
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
      locale: 'en',
      type: 'website',
    },
    twitter: {
      card:`${metaData?.title}`,
      title: `${metaData?.title}`,
      description: `${metaData?.description}`,
      url: `/${metaData?.slug?metaData?.slug:'advertise'}`,
      images: [`${metaData?.image_url}`],
      siteId: process.env.SITE_ID,
    },
  }
}

const Advertise = async () => {
  const pageMeta = await getPostMeta();
  return (
    <>
       <Suspense fallback={<div className="text-center py-10 min-h-[500px] bg-black text-white">Loading...</div>}>

      <Advertisepage bannerContent={pageMeta?.data.advertise}/>
      </Suspense>
    </>
  );
};

export default Advertise;


