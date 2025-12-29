import { Suspense } from "react";
import ContentPage from "@/app/(front)/(pages)/ContentPage";
import { getPages,getPostMeta } from "@/app/lib/server-api";
export const dynamic = "force-dynamic"; // ✅ REQUIRED for Next.js 16

// or Dynamic metadata
export async function generateMetadata({params}) {
  
  //const seoMetaData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/contact-us`).then((res) => res.json());
  //var metaData = seoMetaData?.data;
 
const responseMain = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/contact-us`);
if (!responseMain.ok) { return null; }
const contentTypeMain = responseMain.headers.get('Content-Type');
if (!contentTypeMain || !contentTypeMain.includes('application/json')) {throw new Error('Invalid Content-Type');}
const clonedResponseMain = responseMain.clone(); // Clone the response first
const seoMetaDataMain = await responseMain.json();
var metaData = seoMetaDataMain?.data;


  if(metaData==null){
   // const blogData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}page/contact-us`).then((res) => res.json());
  //var metaData = blogData?.data;
  
	const response2Main = await fetch(`${process.env.NEXT_PUBLIC_API_URL}page/contact-us`);
	if (!response2Main.ok) { return null; }
	const contentType2Main = response2Main.headers.get('Content-Type');
	if (!contentType2Main || !contentType2Main.includes('application/json')) {throw new Error('Invalid Content-Type');}
	const clonedResponseMain = response2Main.clone(); // Clone the response first
        const blogDataMain = await response2Main.json();
	  
	metaData = blogDataMain?.data;

  }
  
  
  
  return {
    alternates: {
      canonical: `/${metaData?.slug?metaData?.slug:'contact-us'}`,
      languages: {
        'en-US': `/${metaData?.slug?metaData?.slug:'contact-us'}`
      },
    },
    title: `${metaData?.title}`,
    description: `${metaData?.short_description?metaData?.short_description:metaData?.description}`,
    openGraph:{
      title: `${metaData?.title}`,
      description: `${metaData?.short_description?metaData?.short_description:metaData?.description}`,
      url: `/${metaData?.slug?metaData?.slug:'contact-us'}`,
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
      description: `${metaData?.short_description?metaData?.short_description:metaData?.description}`,
      url: `/${metaData?.slug?metaData?.slug:'contact-us'}`,
      images: [`${metaData?.image_url}`],
      siteId: process.env.SITE_ID,
    },
  }
}

const SlugPages = async ({params}) => {
  const pages = await getPages('contact');
  const pageMeta = await getPostMeta();
  return (
    <>
   <Suspense fallback={<div className="text-center py-10 min-h-[500px] bg-black text-white"></div>}>
  <ContentPage page='contact-us' pageData={pages?.data} bannerContent={pageMeta.data}/>
  </Suspense>

    </>
  );
};

export default SlugPages;
