import { UserProvider } from '@/context/UserContext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import localFont from 'next/font/local';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Script from "next/script";
import GTM from '../components/headtag/GTM';

const myFont = localFont({
  src: [
    { path: '../assets/lato/Lato-Black.ttf', style: 'normal' },
    { path: '../assets/lato/Lato-Bold.ttf', style: 'normal' },
    { path: '../assets/lato/Lato-Light.ttf', style: 'normal' },
    { path: '../assets/lato/Lato-Regular.ttf', style: 'normal' },
  ],
});

export const metadata = {
  title: { template: '%s', default: 'Vendor Guide' },
  robots: {
    index: false,
    follow: false,
    nocache: false,
  },
};

export default function RootLayout({ children, ...props }) {
  return (
    <html lang="en">
      <head>
        <meta name="DC.title" content="Vendor Guide" />
        <meta name="geo.region" content="US-MN" />
        <meta name="geo.placename" content="Minnetonka" />
        <meta name="geo.position" content="44.940509;-93.463894" />
        <meta name="ICBM" content="44.940509, -93.463894" />

        {/* jQuery + GSAP */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.1/TweenMax.min.js" />

        {/* Simpli.fi base tag */}
        <Script
          async
          src="https://tag.simpli.fi/sifitag/1b1b4113-f234-4312-aec9-3563eea748cd"
        />

       
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
          rel="stylesheet"
        />

        {/* open on Production */}
        {/* <GTM /> */}
      </head>

      <body >
        <UserProvider>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MFMD43HZ"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>

          {children}

          <ToastContainer />

          {/* <TAGFOOTER /> */}
        </UserProvider>
      </body>
    </html>
  );
}
