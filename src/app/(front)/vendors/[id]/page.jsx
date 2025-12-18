import SearchPage from "@/app/(front)/vendors/[id]/SearchPage";
import { getPostMeta } from "@/app/lib/server-api";

// Dynamic metadata for Next.js 15
export async function generateMetadata({ params: awaitedParams }) {
  // Await params before using
  const params = await awaitedParams;
  const id = params.id;

  let metaData = null;

  try {
    const seoMetaRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/vendor_single_page`
    );
    const seoMetaData = await seoMetaRes.json();
    metaData = seoMetaData?.data;

    if (!metaData) {
      const blogRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendor/${id}`);
      const blogData = await blogRes.json();
      metaData = blogData?.data;
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  return {
    alternates: {
      canonical: `/vendors/${metaData?.slug}`,
      languages: {
        "en-US": `/vendors/${metaData?.slug}`,
      },
    },
    title: metaData?.meta_title || metaData?.name,
    keywords: metaData?.meta_keywords || "",
    description: metaData?.meta_description || metaData?.description || "",
    openGraph: {
      title: metaData?.meta_title || metaData?.name,
      description: metaData?.meta_description || metaData?.description || "",
      url: `/vendors/${metaData?.slug}`,
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: metaData?.image_url || "",
          secure_url: metaData?.image_url || "",
          width: 725,
          height: 405,
          alt: metaData?.meta_title || metaData?.name,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: metaData?.meta_title || metaData?.name,
      title: metaData?.meta_title || metaData?.name,
      description: metaData?.meta_description || metaData?.description || "",
      url: `/vendors/${metaData?.slug}`,
      images: [metaData?.image_url || ""],
      siteId: process.env.SITE_ID,
    },
  };
}

export default async function Details({ params: awaitedParams }) {
  const params = await awaitedParams;
  const id = params.id;

  let pageMeta = null;

  try {
    const response = await getPostMeta();
    pageMeta = response?.data || {};
  } catch (error) {
    console.error("Error fetching page meta:", error);
  }

  return <SearchPage slug={id} bannerContent={pageMeta.vendor_details || {}} />;
}
