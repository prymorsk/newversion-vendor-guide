import ContentPage from "@/app/(front)/(pages)/ContentPage";
import { getPages, getPostMeta } from "@/app/lib/server-api";
export const dynamic = "force-dynamic";

// Dynamic metadata for Next.js 15
export async function generateMetadata({ params }) {
  let metaData = null;

  try {
    const responseTerm = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/terms-and-conditions`);
    if (responseTerm.ok && responseTerm.headers.get("Content-Type")?.includes("application/json")) {
      const seoMetaDataTerm = await responseTerm.json();
      metaData = seoMetaDataTerm?.data ?? null;
    }

    // Fallback if SEO meta is not available
    if (!metaData) {
      const response2Term = await fetch(`${process.env.NEXT_PUBLIC_API_URL}page/terms-and-conditions`);
      if (response2Term.ok && response2Term.headers.get("Content-Type")?.includes("application/json")) {
        const blogData2Term = await response2Term.json();
        metaData = blogData2Term?.data ?? null;
      }
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
    metaData = null;
  }

  const slug = metaData?.slug ?? "terms-and-conditions";
  const title = metaData?.title ? `${metaData.title} - Vendor Guide Online` : "Terms and Conditions - Vendor Guide Online";
  const description = "Read the terms and conditions for using Vendor Guide Online. Understand our policies and guidelines to ensure a smooth experience with our platform.";

  return {
    alternates: {
      canonical: `/${slug}`,
      languages: {
        "en-US": `/${slug}`,
      },
    },
    title,
    keywords: "terms and conditions, vendor guide online, terms of use, user agreement, platform policies, website terms, online guidelines",
    description,
    openGraph: {
      title,
      description,
      url: `/${slug}`,
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: metaData?.image_url,
          secure_url: metaData?.image_url,
          width: 725,
          height: 405,
          alt: metaData?.title ?? "",
        },
      ],
      locale: "en",
      type: "website",
    },
    twitter: {
      card: metaData?.title ?? "",
      title,
      description,
      url: `/${slug}`,
      images: [metaData?.image_url],
      siteId: process.env.SITE_ID,
    },
  };
}

const SlugPages = async ({ params }) => {
  const pages = await getPages("terms-and-conditions");
  const pageMeta = await getPostMeta();

  return (
    <ContentPage page="terms-and-conditions" pageData={pages?.data} bannerContent={pageMeta?.data} />
  );
};

export default SlugPages;
