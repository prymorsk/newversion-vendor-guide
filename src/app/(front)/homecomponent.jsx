"use client";
import { useAuth } from "@/context/UserContext";
import BannerSectionCardHome from "@/components/Front/BannerSectionCardHome";
import FeaturSection from "@/components/Front/FeaturSection";
import FeaturSectionWord from "@/components/Front/FeaturSectionWord";
import PartnerSection from "@/components/Front/PartnerSection";
import SearchBar from "@/components/Front/SearchBar";
import Link from "next/link";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useSearchParams,usePathname,useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import RequestQuotebtnHome from "@/components/Front/RequestQuotebtnHome";
import ContractorHomepage from "@/components/Front/ContractorHomepage";




const HomeComponent = ({sitesetting, blogs, vendors, bannerContent, categories, states, homeBannerText,contractors }) => {
const {user,isLoding,isInfoLoding,logout}  = useAuth();
const backgroundImage = bannerContent?.hero_background;



const { metaData, loading } = useAuth();

const [isActive, setIsActive] = useState(false);
const [profileUrl, setProfileUrl] = useState("");
const cookie = getCookie('token');
const pathname = usePathname()
const  UserType  = getCookie('user-type');
const [UserTypeName, setUserTypeName] = useState("");


const LogoHomestat = "/images/hero-image.jpg";

const hometext = sitesetting?.data?.home_hero_text
  ? sitesetting.data.home_hero_text
  : '<h1>Exceptional commercial <strong>cleaning delivered</strong> by passionate people</h1><p>Vendor Guide Online Maintenance is a national provider of premium facility cleaning and janitorial services4.</p>';

const LogoHome = sitesetting?.data?.Homebanner_url
  ? sitesetting.data.Homebanner_url
  : LogoHomestat;






  const [mounted, setMounted] = useState(false);
 useEffect(() => {
    setMounted(true);
  }, []);

   //if (!mounted) return null;

  return (
    <>
      <section className="hero-section" style={{
      backgroundColor:'#000',
      backgroundImage: LogoHome
      ? `url(${LogoHome})`
      : "none",
      }}>
        <div className="container mx-auto px-4 flex flex-row gap-4 items-center">
          <div className="customrbutton hero-content">
            
            
            <div className="home-text" dangerouslySetInnerHTML={{ __html: hometext }} />

            <div className="hero-button inline-block mt-6 button ">
              {UserType == 1 || !user ? (<RequestQuotebtnHome user={user} categories={categories} />): ''}

             
            </div>
          </div>
        </div>
      </section>


      <SearchBar   homeMeta={bannerContent} categories={categories} states={states} />


      {/* Featured Suppliers Section */}
      <section className="featured-suppliers-sections">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="columnleft contentleft">
              <em>Property Maintenance Contractors Marketplace</em>
              <h3>Your one-stop-shop for contractor sourcing & management.</h3>
            </div>
            <div className="columnright contentright p-10">
              <h6>Cut the hassle, save time and money with our easy to use vendor marketplace.</h6>
              <Link href="/register" className="button-signup">
                <em><Image src="/images/finger.svg" alt="finger" width={10} height={6} /></em> 
                Sign Up Today
              </Link>
            </div>
          </div>
        </div>


       <BannerSectionCardHome  />

      </section>

     
      {/* Welcome Section */}


      <FeaturSectionWord blogs={blogs} homeBannerText={homeBannerText} />

      

      {/* Why Choose Us */}
      <section className="whychoose-sections mt-24">
        <div className="container mx-auto">
          <div className="whychoose-innerrow">
            <div className="title">
              <h5>Why Choose Us?</h5>
            </div>
            <div className="whychoose-fourbox">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="whychoose-iconbox">
                  <div className="icon">
                    <Image src="/images/vendor-icon-enhance-1.png" alt="enhance" width={60} height={60} />
                  </div>
                  <h6>Enhance Your Profile</h6>
                  <p>Add photos, videos, and more to build your brand.</p>
                </div>

                <div className="whychoose-iconbox">
                  <div className="icon">
                    <Image src="/images/vendor-icon-exposure-1.png" alt="exposure" width={60} height={60} />
                  </div>
                  <h6>Increase Exposure</h6>
                  <p>Get noticed and network with hundreds of companies.</p>
                </div>

                <div className="whychoose-iconbox">
                  <div className="icon">
                    <Image src="/images/vendor-icon-costs-1.png" alt="costs" width={60} height={60} />
                  </div>
                  <h6>Cut Marketing Costs</h6>
                  <p>Reach qualified clients for as little as $75 per year.</p>
                </div>

                <div className="whychoose-iconbox">
                  <div className="icon">
                    <Image src="/images/vendor-icon-handshake.png" alt="handshake" width={60} height={60} />
                  </div>
                  <h6>Respond To Bids And Get Awarded Contracts</h6>
                  <p>Premium subscribers can respond to bid requests and manage contracts.</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Profile section */}
      <section className="fourprofile-section">
        <div className="container mx-auto items-center">
          <div className="flex flex-col md:flex-row gap-4 items-center">

            
          <div className={`w-full ${contractors?.length > 0 ? "md:w-[60%]" : "md:w-[100%] contrfullwith"}` } >
                 


              <div className="fourprofile-leftcontent">
                <span>PROPERTY MAINTENANCE CONTRACTORS MARKETPLACE</span>
                <h3>Your one-stop-shop for contractor sourcing & management.</h3>
                <p>Save time, money and headaches when dealing with vendors through our simplified and vetted marketplace.</p>
                <Link href="register" className="btnsignup">Sign Up Today</Link>
              </div>
            </div>

          
      <ContractorHomepage contractors={contractors}  />

               

          </div>
        </div>
      </section>

      {/* Partner Section */}
      <section className="partner-Vendor-sections">
        <div className="container mx-auto items-center justify-items-center">
          <div className="partner-Vendor-content">
            <h3>Partner with Vendor Guide.</h3> 
            <p>Take the step to join our esteemed community by signing up today and becoming a valued member of our trusted vendor network.</p>
            <Link href="/register"
             className="px-6 py-2 border border-white text-white bg-transparent rounded-lg hover:bg-white/10 transition">Sign Up Today</Link>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default HomeComponent;
