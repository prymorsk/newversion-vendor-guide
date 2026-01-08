import "@/app/globals.css";
import NewRegionalHeader from "@/components/Layouts/Front/NewRegionalHeader";
import FooterAuth from "@/components/Layouts/Front/FooterAuth";
import Header from "@/components/Layouts/Front/Header2";
import { UserProvider } from "@/context/UserContext";
import {
  getCategories,
  getMagazines,
  getWebsiteSetting,
  getBlogs,
  getPages,
} from "@/app/lib/server-api";

export default async function ModuleLayout({ children }) {
  // Server-side data fetching
  const categories = await getCategories();
  const magazines = await getMagazines();
  const sitesetting = await getWebsiteSetting();
  const blogs = await getBlogs({ cache: "force-cache" });
  const homeBannerText = await getPages("home-banner-text", {
    cache: "force-cache",
  });

  return (
   
      <>
        <Header
          categories={categories || []}
          magazines={magazines || []}
          sitesetting={sitesetting?.data || {}}
        />
        
        {children}

        <FooterAuth
          homeBannerText={homeBannerText?.data || {}}
          blogs={blogs || []}
          sitesetting={sitesetting?.data || {}}
          nationalads={sitesetting?.nationalads || []}
        />

        
      </>
    
  )
}
