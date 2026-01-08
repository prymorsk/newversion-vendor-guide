import LoginForm from "./LoginForm"; // client component
import Right from "@/components/Front/Auth/Right";

export const dynamic = "force-dynamic"; // ✅ REQUIRED in Next.js 16

export async function generateMetadata() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/login`,
      { cache: "no-store" } // ✅ dynamic fetch
    );

    if (!response.ok) return {};

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("Invalid Content-Type");
    }

    const seoMetaData = await response.json();
    const metaData = seoMetaData?.data || {};

    const slug = metaData?.slug || "login";
    const pageUrl = `/${slug}`;

    return {
      alternates: {
        canonical: pageUrl,
        languages: {
          "en-US": pageUrl,
        },
      },
      title: metaData?.title || "Login",
      description: metaData?.description || "",
      openGraph: {
        title: metaData?.title || "Login",
        description: metaData?.description || "",
        url: pageUrl,
        siteName: process.env.SITE_NAME,
        images: [
          {
            url: metaData?.image_url || "",
            width: 725,
            height: 405,
            alt: metaData?.title || "Login",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image", // ✅ FIXED (was invalid)
        title: metaData?.title || "Login",
        description:
          metaData?.short_description || metaData?.description || "",
        images: [metaData?.image_url || ""],
        site: process.env.SITE_ID, // ✅ FIXED (siteId → site)
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {};
  }
}

const Page = () => {
  return (
    <>
      <section className="inner hero-section commonpage">
        <div className="container mx-auto px-4 flex flex-row gap-4 items-center"></div>
      </section>

      <section className="innerpage-wapper-sections">
        <div className="container mx-auto">
          <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 flex flex-col lg:flex-row gap-10 border border-gray-300 leading-relaxed text-gray-800">

            <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato lg:px-10">
              Login
            </h1>

            <div className="container mx-auto overflow-hidden xl:px-24 lg:px-8 md:px-12">
              <div className="mx-auto max-w-7xl">
                <div className="lg:mx-auto max-w-4xl grid grid-cols-2 md:gap-x-16 md:gap-y-16 lg:max-w-none">

                  <LoginForm />
                    <Right />
                 

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
