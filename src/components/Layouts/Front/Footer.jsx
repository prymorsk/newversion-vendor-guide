'use client';

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/UserContext";
import { useState,useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import FeaturSection from "@/components/Front/FeaturSection";
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Footer = ({ sitesetting, nationalads, blogs, homeBannerText }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const vendorslugValue = searchParams.get('vendorslug');
  let parts = pathname.split("/");

const isBlogPage = pathname.includes("/blog"); // ✅ check if URL is blog
const islogin = pathname.includes("/login"); // ✅ check if URL is blog
const isregister = pathname.includes("/register"); // ✅ check if URL is blog


const flogo = "/images&icons/SVG/logo_white.svg";
const starImg = "/images&icons/SVG/star.svg";
const PhoneIcon = "/images&icons/telephone.png";
const envelopeIcon = "/images&icons/envelope.png";
const mapIcon = "/images&icons/mapicon.png";
const newenvelopeIcon = "/images&icons/newenvelope.png";
const newPhoneIcon = "/images&icons/newtelephone.png";

const address = sitesetting?.side_address;
const firstLine = address?.slice(0, 30);
const rest = address?.slice(30);

  return (
    <>
      {/* Banner Ad Section */}
      {parts[1] !== 'vendors' && nationalads && nationalads.length > 0 && (
        <section className="bannerad-sec ">
          <div className="container mx-auto items-center justify-items-center">
            <div className="adimg">
              <Carousel showIndicators={false} showThumbs={false} autoPlay infiniteLoop interval={3000} stopOnHover showStatus={false}>
                {nationalads && nationalads.map((row, i) => (
                  <Link key={i} href={row.ads_link} className="flex items-center md:ps-8 sm:ps-7">
                    <Image
                      src={row.ads_image}
                      className="w-full h-[100%] xl:h-[100%] object-fill"
                      alt={row.ads_alt}
                      width={1400}
                      height={200}
                    />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      )}

      {/* ✅ Hide FeatureSection on blog pages */}
      {!isBlogPage && <FeaturSection blogs={blogs} homeBannerText={homeBannerText} />}

      {/* Footer Section */}
      <footer className="bg-[#2A2A2A] text-white rounded-t-[80px] py-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white">
              <div className="footer-logo">
                <Link href="/">
                  <Image src={sitesetting?.sidefooterlogo_url?sitesetting?.sidefooterlogo_url:flogo} alt="logof" width={350} height={48} />
                </Link>
              </div>
            </h2>

            <Link target="_blank" href="https://api.leadconnectorhq.com/widget/form/dFm4D77pcQYxlnCQBqIT">
              <button className="mt-4 md:mt-0 px-6 py-2 rounded-full bg-white text-black border border-white transition duration-300 hover:bg-transparent hover:text-white">
                Subscribe to Our Newsletter
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full border-t border-white/30 my-8"></div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
          <h3 className="font-semibold mb-4 text-white">Advertise</h3>
          <p className="flex items-center gap-2 mb-2 text-white">📞 <Link href={`tel:${sitesetting?.side_phone}`} >{sitesetting?.side_phone}</Link></p>
          <p className="flex items-center gap-2 text-white">✉ <Link href={`mailto:${sitesetting?.side_email}`} >{sitesetting?.side_email}</Link></p>
          </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Explore</h3>
              <ul className="space-y-2 text-white">
                <li><Link href="/advertise" className="hover:text-gray-300">Advertise</Link></li>
                <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:text-gray-300">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Visit</h3>
            <p className="flex items-center text-white leading-relaxed max-w-[30ch] break-words">
             <Link
                    href="//g.page/planet-media-wayzata?share"
                    rel="nofollow"
                    target="_blank"
                    >
                    {firstLine}<br />{rest}
                    </Link>
                    </p>
                     <ul className="flex nav_list text-sm pl-10 sm:pl-0">
               {sitesetting?.side_facebook_url && (
                <li>
                  <Link href={sitesetting?.side_facebook_url} rel="nofollow" target="_blank" className="p-1 text-xl">
                    <FontAwesomeIcon icon={faFacebook} className="pr-2" />
                  </Link>
                  </li>
                )}
                {sitesetting?.side_lingding_url && (
               <li>
                  <Link href={sitesetting?.side_lingding_url} rel="nofollow" target="_blank" className="p-1 text-xl">
                    <FontAwesomeIcon icon={faLinkedin} className="pr-2" />
                  </Link>
                </li>
               )}
               {sitesetting?.side_instagram_url && (
                <li>
                  <Link href={sitesetting?.side_instagram_url} rel="nofollow" target="_blank" className="p-1 text-xl">
                    <FontAwesomeIcon icon={faInstagram} className="pr-2" />
                  </Link>
                </li>
               )}
               {sitesetting?.side_twitter_url && (
                  <li>
                    <Link href={sitesetting?.side_twitter_url} rel="nofollow" target="_blank" className="p-1 text-xl">
                      <FontAwesomeIcon icon={faTwitter} className="pr-2" />
                    </Link>
                  </li>
               )}
              </ul>

            </div>

            
          </div>
        </div>

        <div className="w-full border-t border-white/30 my-8"></div>
        <div className="container mx-auto">
          <p className="text-center text-white text-sm">
  &copy; 2011–{new Date().getFullYear()} Vendor Guide Online
</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
