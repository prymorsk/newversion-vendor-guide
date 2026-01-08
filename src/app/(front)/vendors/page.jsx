import Searchpage from "@/app/(front)/vendors/Searchpage";
import { getPostMeta, getStates } from "@/app/lib/server-api";
export const dynamic = "force-dynamic";

// Dynamic metadata
export async function generateMetadata({ params }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/vendor_listing`,
      { method: "GET", cache: "no-cache" }
    );

    if (!response.ok || response.status === 429) {
      return null;
    }

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid Content-Type");
    }

    const seoMetaData = await response.json();
    const metaData = seoMetaData?.data || {};

    const slug = metaData?.slug || "search";

    return {
      alternates: {
        canonical: `/${slug}`,
        languages: {
          "en-US": `/${slug}`,
        },
      },
      title: `${metaData?.title || ""} | Vendor Guide`,
      description: `${metaData?.description || ""}`,
      openGraph: {
        title: `${metaData?.title || ""}`,
        description: `${metaData?.description || ""}`,
        url: `/${slug}`,
        siteName: process.env.SITE_NAME,
        images: [
          {
            url: `${metaData?.image_url || ""}`,
            secure_url: `${metaData?.image_url || ""}`,
            width: 725,
            height: 405,
            alt: `${metaData?.title || ""}`,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: `${metaData?.title || ""}`,
        title: `${metaData?.title || ""}`,
        description: `${metaData?.description || ""}`,
        url: `/${slug}`,
        images: `${metaData?.image_url || ""}`,
        siteId: process.env.SITE_ID,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return null;
  }
}

const Page = async () => {

const vendors = ""; // placeholder, can be replaced later
const pageMeta = await getPostMeta();
const states = await getStates();
//console.log("venodrs loading...");
//console.log(pageMeta);


  return (
    <>
      <Searchpage vendors={vendors} bannerContent={pageMeta?.data?.search} states={states} />
    </>
  );
};

export default Page;
