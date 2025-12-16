import Link from "next/link";
import Image from "next/image";

export default function FeaturSection({blogs}) {
  const advertiseData = blogs;

  return (
    <>
      
     <section className="Resources-sections mt-20 mb-20">
  <div className="container mx-auto justify-items-center">
    <div className="title mt-5 mb-5 justify-items-center">
      <h3>Resources</h3>
    </div>

    <div className="Resources-listing">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">

        {advertiseData && advertiseData?.data.map((row, i) => {
          return (
            <div key={i} className="card flex flex-col gap-4 max-w-[600px] w-full">
              <Link href={`/blog/${row.slug}`}>
                <Image
                  src={row.image_url}
                  alt={`blog-${i}`}
                  className="w-full rounded-xl object-cover"
                  width={600}
                  height={300}
                />
              </Link>

              <h3 className="text-lg font-semibold leading-tight">
                {row.title}
              </h3>


            <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{
              __html: row?.description
                ? (
                    row.description
                      .replace(/<[^>]*>/g, "")   // remove HTML tags
                      .slice(0, 150) +
                    (row.description.replace(/<[^>]*>/g, "").length > 150 ? "..." : "")
                  )
                : ""
            }}
            />

              <Link
                href="/register"
                className="w-fit px-5 py-2 rounded-full bg-[#9E2A2A] text-white border border-[#9E2A2A] transition duration-300 hover:bg-transparent hover:text-[#9E2A2A]"
              >
                Talk to us
              </Link>
            </div>
          );
        })}

      </div>
    </div>
  </div>
</section>


    </>
  );
}
