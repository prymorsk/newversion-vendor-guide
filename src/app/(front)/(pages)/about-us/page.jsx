import ContentPageAbout from "@/app/(front)/(pages)/ContentPageAbout";
import { getPages, getPostMeta } from "@/app/lib/server-api";

// Dynamic metadata
export async function generateMetadata({ params }) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/about-us`);
  if (!response.ok) { return null; }
  const contentType = response.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Invalid Content-Type');
  }

  const seoMetaData = await response.json();
  let metaData = seoMetaData?.data;

  if (metaData == null) {

    const response2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}page/about-us`);
    if (!response2.ok) { return null; }

    const contentType2 = response2.headers.get('Content-Type');
    if (!contentType2 || !contentType2.includes('application/json')) {
      throw new Error('Invalid Content-Type');
    }

    const blogData = await response2.json();
    metaData = blogData?.data;
  }

  return {
    alternates: {
      canonical: `/${metaData?.slug ? metaData.slug : 'about-us'}`,
      languages: {
        'en-US': `/${metaData?.slug ? metaData.slug : 'about-us'}`,
      },
    },
    title: `${metaData?.title}`,
    description: `${metaData?.short_description ? metaData.short_description : metaData?.description}`,
    openGraph: {
      title: `${metaData?.title}`,
      description: `${metaData?.short_description ? metaData.short_description : metaData?.description}`,
      url: `/${metaData?.slug ? metaData.slug : 'about-us'}`,
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: `${metaData?.image_url ? metaData.image_url : ''}`,
          secure_url: `${metaData?.image_url ? metaData.image_url : ''}`,
          width: 725,
          height: 405,
          alt: `${metaData?.title}`,
        }
      ],
      locale: 'en',
      type: 'website',
    },
    twitter: {
      card: `${metaData?.title}`,
      title: `${metaData?.title}`,
      description: `${metaData?.short_description ? metaData.short_description : metaData?.description}`,
      url: `/${metaData?.slug ? metaData.slug : 'about-us'}`,
      images: [`${metaData?.image_url ? metaData.image_url : ''}`],
      siteId: process.env.SITE_ID,
    },
  };
}

const SlugPages = async ({ params }) => {
  const pages = await getPages('about');
  const pageMeta = await getPostMeta();
  const aboutBannerText = await getPages('about-banner-text');

  return (
    <>
      <ContentPageAbout
        aboutBannerText={aboutBannerText?.data}
        page="about-us"
        pageData={pages?.data}
        bannerContent={pageMeta?.data}
      />
    </>
  );
};

export default SlugPages;
