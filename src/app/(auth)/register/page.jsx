// app/register/page.jsx
import Right from "@/components/Front/Auth/Right";
import { SignupForm } from "./SignupForm";

// Dynamic metadata for Next.js 15
export async function generateMetadata({ params }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/register`, {
      // Ensure fresh data on each request
      cache: "no-store",
    });

    if (!response.ok) return null;

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid Content-Type");
    }

    const seoMetaData = await response.json();
    const metaData = seoMetaData?.data || {};

    return {
      alternates: {
        canonical: `/${metaData?.slug || "register"}`,
        languages: {
          "en-US": `/${metaData?.slug || "register"}`,
        },
      },
      title: metaData?.title || "Register",
      description: metaData?.description || "",
      openGraph: {
        title: metaData?.title || "Register",
        description: metaData?.description || "",
        url: `/${metaData?.slug || "register"}`,
        siteName: process.env.SITE_NAME,
        images: [
          {
            url: metaData?.image_url || "",
            secure_url: metaData?.image_url || "",
            width: 725,
            height: 405,
            alt: metaData?.title || "Register",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: metaData?.title || "Register",
        title: metaData?.title || "Register",
        description: metaData?.short_description || metaData?.description || "",
        url: `/${metaData?.slug || "register"}`,
        images: [metaData?.image_url || ""],
        siteId: process.env.SITE_ID,
      },
    };
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);
    return {};
  }
}

const Page = () => {
  return (


<>
 <section className="inner hero-section commonpage">
        <div className="container mx-auto px-4 flex flex-row gap-4 items-center">
          
        </div>
      </section>

<section className="innerpage-wapper-sections">
<div className="container mx-auto">
<div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8  flex-col lg:flex-row gap-10 bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">

  <h1 className="text:sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold    font-lato lg:px-10" >Registration</h1>



      <div className="mx-auto max-w-7xl">
        <div className="lg:mx-auto max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">
          <div className="md:col-span-2 lg:col-span-1 col-span-12 lg:-mr-16 order-2 sm:order-1">
            <div className="container mx-auto overflow-hidden p-8 md:pt-12 sm:px-12 md:px-12 xl:px-12">
              <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
              ></div>
              
              <SignupForm />
            </div>
          </div>
          <Right />
        </div>
      </div>

    </div>
    </div>
    </section >




    </>


  );
};

export default Page;
