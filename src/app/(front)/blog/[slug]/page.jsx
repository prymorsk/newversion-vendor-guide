import PageComponent from "./pageComponent";

// Utility to fetch blog or SEO metadata
async function fetchBlogData(slug) {
  // Fetch SEO metadata
  const seoResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/blog_single_page`);
  const seoMetaData = await seoResponse.json();
  let metaData = seoMetaData?.data;

  // If SEO metadata missing, fetch blog data
  if (!metaData) {
    const blogResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}blog/${slug}`);
    const blogData = await blogResponse.json();
    metaData = blogData?.data;
  }

  return metaData;
}

// Dynamic metadata with awaited params
export async function generateMetadata({ params: maybeAsyncParams }) {
  const params = await maybeAsyncParams; // ✅ await params
  const slug = params.slug;

  const metaData = await fetchBlogData(slug);

  //console.log('Main blog metaData...');
  //console.log(params);
   //console.log(metaData);

  return {
    alternates: {
      canonical: `/blog/${metaData.slug}`,
      languages: { "en-US": `/blog/${metaData.slug}` },
    },
    title: metaData?.meta_title,
    keywords: metaData?.meta_keyword,
    description: metaData?.meta_description || metaData?.description,
    openGraph: {
      title: metaData?.meta_title,
      description: metaData?.meta_description || metaData?.description,
      url: `/blog/${metaData?.slug}`,
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: metaData?.image_url,
          secure_url: metaData?.image_url,
          width: 725,
          height: 405,
          alt: metaData?.meta_title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: metaData?.meta_title,
      title: metaData?.meta_title,
      description: metaData?.meta_description || metaData?.description,
      url: `/blog/${metaData?.slug}`,
      images: [metaData?.image_url],
      siteId: process.env.SITE_ID,
    },
  };
}

// Server Component Page
export default async function Page({ params: maybeAsyncParams }) {
  const params = await maybeAsyncParams; // ✅ await params

  //console.log('1 blog loading...');
  //console.log(params);

  
  const slug = params.slug;

  const metaData = await fetchBlogData(slug);

    //console.log('blog detail loading...');
   
    //console.log(metaData);


  return <PageComponent slug={slug} serverBlogData={metaData} />;
}
