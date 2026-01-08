import { Suspense } from "react";
import ContentPageAbout from "@/app/(front)/(pages)/ContentPageAbout";
import { getPages, getPostMeta } from "@/app/lib/server-api";
export const dynamic = "force-dynamic"; // ✅ REQUIRED for Next.js 16

// Dynamic metadata for Next.js
export async function generateMetadata({ params }) {
  let metaData = null;

  try {
    // Primary API for SEO meta
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/about-us`,
      { cache: "no-store" } // ensures fresh data
    );

    if (response.ok) {
      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        const seoMetaData = await response.json();
        metaData = seoMetaData?.data;
      }
    }

    // Fallback API if metaData is null
    if (!metaData) {
      const fallbackResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}page/about-us`,
        { cache: "no-store" }
      );

      if (fallbackResponse.ok) {
        const contentType2 = fallbackResponse.headers.get("Content-Type");
        if (contentType2?.includes("application/json")) {
          const fallbackData = await fallbackResponse.json();
          metaData = fallbackData?.data;
        }
      }
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  // Default values if API fails
  metaData = metaData || {
    title: "About Us",
    description: "About us page",
    slug: "about-us",
    image_url: "",
  };

  const canonicalSlug = metaData.slug || "about-us";

  return {
    alternates: {
      canonical: `/${canonicalSlug}`,
      languages: {
        "en-US": `/${canonicalSlug}`,
      },
    },
    title: metaData.title,
    description: metaData.short_description || metaData.description || "",
    openGraph: {
      title: metaData.title,
      description: metaData.short_description || metaData.description || "",
      url: `/${canonicalSlug}`,
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: metaData.image_url || "",
          secure_url: metaData.image_url || "",
          width: 725,
          height: 405,
          alt: metaData.title,
        },
      ],
      locale: "en",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaData.title,
      description: metaData.short_description || metaData.description || "",
      url: `/${canonicalSlug}`,
      images: [metaData.image_url || ""],
      siteId: process.env.SITE_ID,
    },
  };
}

// Page component
const SlugPages = async ({ params }) => {
  // Fetch content for the page
  const pages = await getPages("about");
  const pageMeta = await getPostMeta();
  const aboutBannerText = await getPages("about-banner-text");

  return (

    <ContentPageAbout
      aboutBannerText={aboutBannerText?.data}
      page="about-us"
      pageData={pages?.data}
      bannerContent={pageMeta?.data}
    />

  );
};

export default SlugPages;
