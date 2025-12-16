"use client";
import { createContext, useContext } from "react";

const SiteContext = createContext();

export async function SiteProvider({ children }) {

    async function getSettings() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}site_setting`, { cache: 'no-store' })
        const vendorRes = await res.json()
        return vendorRes
    }

    const sitesetting = await getSettings();

    return (
        <SiteContext.Provider value={{sitesetting}}>
          {children}
        </SiteContext.Provider>
    );
}

export function useSiteSettings() {
    return useContext(SiteContext);
  }