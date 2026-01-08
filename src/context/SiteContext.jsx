"use client";
import { createContext, useContext } from "react";

const SiteContext = createContext();

export async function SiteProvider({ children }) {

    async function getWebsiteSetting() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}website_setting`, { cache: 'no-store' })
        const vendorRes = await res.json()
        return vendorRes
    }

    const sitesetting = await getWebsiteSetting();

    return (
        <SiteContext.Provider value={{sitesetting}}>
          {children}
        </SiteContext.Provider>
    );
}

export function useSiteSettings() {
    return useContext(SiteContext);
  }