import LoginForm from "./LoginForm"; // client component

// Dynamic metadata (server-side)
export async function generateMetadata({ params }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}seo-meta-show/login`
    );

    if (!response.ok) return {};

    const contentType = response.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid Content-Type");
    }

    const seoMetaData = await response.json();
    const metaData = seoMetaData?.data || {};

    return {
      alternates: {
        canonical: `/${metaData?.slug || "login"}`,
        languages: { "en-US": `/${metaData?.slug || "login"}` },
      },
      title: metaData?.title || "",
      description: metaData?.description || "",
      openGraph: {
        title: metaData?.title || "",
        description: metaData?.description || "",
        url: `/${metaData?.slug || "login"}`,
        siteName: process.env.SITE_NAME,
        images: [
          {
            url: metaData?.image_url || "",
            secure_url: metaData?.image_url || "",
            width: 725,
            height: 405,
            alt: metaData?.title || "",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: metaData?.title || "",
        title: metaData?.title || "",
        description: metaData?.short_description || metaData?.description || "",
        url: `/${metaData?.slug || "login"}`,
        images: [metaData?.image_url || ""],
        siteId: process.env.SITE_ID,
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {};
  }
}

const Page = async () => {
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

                  <div className="md:col-span-1 lg:col-span-1 col-span-12 order-2 sm:order-1">
                    <div className="bg-[url('/images&icons/loginback.jpg')] h-full bg-cover bg-no-repeat"></div>
                  </div>

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
