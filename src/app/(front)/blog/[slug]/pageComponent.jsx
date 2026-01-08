"use client";

import LoadingComponents from "@/components/LoadingComponents";
import { useAuth } from "@/context/UserContext";
import axios from "@/lib/axios";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function PageComponent({ slug, serverBlogData }) {
  const { metaData, loading } = useAuth();
  const resourceMeta = metaData?.blog || {};
  //console.log('metaData...');

//console.log(resourceMeta);
//console.log('metaData end...');

  const [blog, setBlog] = useState(serverBlogData || null);
  const [isLoading, setLoading] = useState(!serverBlogData);
  const [mounted, setMounted] = useState(false);




  useEffect(() => {
    setMounted(true);
  }, []);

  // Only fetch blog if not provided from server
  useEffect(() => {
    if (!serverBlogData) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}blog/${slug}`)
        .then((response) => {
          setBlog(response.data.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [slug, serverBlogData]);

  if (!mounted) return null;

  return (
    <>
      <Fragment>
        {isLoading ? (
          <div className="top_banner sm:relative">
            <LoadingComponents />
          </div>
        ) : (
          <>
            
      {/* Hero Section */}

      <section id="hero_section" className="inner hero-section commonpage" 
      style={{
      backgroundImage: resourceMeta.hero_background
      ? `url(${resourceMeta.hero_background})`
      : "none",
      }}
      >
      {/* Hero Section */}
      </section>


            {/* Blog Content Section */}
            <section className="innerpage-wapper-sections">
              <div className="container mx-auto">
                <div className="infobox-details w-full mx-auto bg-white rounded-3xl p-8 flex flex-col lg:flex-row gap-10 bg-white border border-gray-300 rounded-3xl p-8 leading-relaxed text-gray-800">
                  
<div id="featurs_section"className="py-9 md:py-5 blogpgeMain">

<h1 className="text:sm mb-5 sm:text-lg md:text-2xl lg:text-3xl xl:text-[2.50rem] -tracking-tight md:leading-10 lg:leading-[3.5rem] font-semibold font-lato" >{blog?.title}</h1>



                    <div className="container mx-auto cpt-0">
                      <div className="mx-auto full-w">

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:gap-x-5 relative">
                          {blog && (
                            <div className="md:text-left text-center">
                              <div className="col-span-1 aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                                {blog.image_url && (
                                  <Image
                                    src={blog.image_url}
                                    alt={blog.title || "Blog Image"}
                                    width={100}
                                    height={100}
                                    className="h-full w-full object-fill object-center lg:h-full lg:w-full"
                                  />
                                )}
                              </div>

                              <div className="blogdescription">
                                <div
                                  className="mt-1 lg:text-xl text-lg text-[#221F20] font-medium"
                                  dangerouslySetInnerHTML={{
                                    __html: blog?.description,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           </section>
          </>
        )}
      </Fragment>
    </>
  );
}
