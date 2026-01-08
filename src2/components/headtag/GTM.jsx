"use client";
// src/components/GTM.js
import { useState, useEffect } from "react";

export default function GTM() {
 const [mounted, setMounted] = useState(false);
 // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // IMPORTANT for Next.js 15 hydration
 console.log('GTM loaded...');


  return (
    <>



{/* Google Analytics Script1 */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-P38KGW6P64"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P38KGW6P64');
          `,
        }}
/>    


  
   {/* Google Analytics Script2 */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-HBKZX0NDDN"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HBKZX0NDDN');
          `,
        }}
/>    
    
  
      <script 
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MFMD43HZ');
          `,
        }}
      />
      
{/* Organisation Schema*/}
<script type="application/ld+json"
dangerouslySetInnerHTML={{
          __html: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Vendor Guide",
  "alternateName": "Vendor Guide",
  "url": "https://vendorguideonline.com/",
  "logo": "https://dtm.vendorguideonline.com/image/1700727849.png",
  "sameAs": [
    "https://www.facebook.com/vendorguideusa/",
    "https://www.linkedin.com/company/mf-vendor-guide/"
  ] 
 }`,
}}
/>
      
{/* Organisation  Schema End  */}
 


{/* Local Business Schema  */}
<script type="application/ld+json"
         dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Vendor Guide",
            "image": "https://dtm.vendorguideonline.com/image/1700727849.png",
            "@id":"",
            "url": "https://vendorguideonline.com/",
             "telephone": "9524601916",
             "address": {
                     "@type": "PostalAddress",
                    "streetAddress": "12800 Whitewater Drive, Suite 100",
                    "addressLocality": "Minnetonka",
                    "addressRegion": "MN",
                    "postalCode": "55343",
                    "addressCountry": "US"
                      }  
                   }`,
               }}
      />   
{/* Local Business Schema End */}


{/* BEGIN PLERDY CODE */}
<script type="text/javascript" defer data-plerdy_code="1"
    dangerouslySetInnerHTML={{
          __html: ` var _protocol="https:"==document.location.protocol?"https://":"http://";
    _site_hash_code = "33945d7c7abc09920f34e739ef9da287",_suid=58314, plerdyScript=document.createElement("script");
    plerdyScript.setAttribute("defer",""),plerdyScript.dataset.plerdymainscript="plerdymainscript",
    plerdyScript.src="https://d.plerdy.com/public/js/click/main.js?v="+Math.random();
    var plerdymainscript=document.querySelector("[data-plerdymainscript='plerdymainscript']");
    plerdymainscript&&plerdymainscript.parentNode.removeChild(plerdymainscript);
    try{document.head.appendChild(plerdyScript)}catch(t){console.log(t,"unable add script tag")}
  `,
     }}
    />    

{/* END PLERDY CODE */}


{/* start clarity CODE */}
<script 
dangerouslySetInnerHTML={{
__html: `
(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "qfu8bmno31");
`,
}}
/>
{/* END clarity CODE */}


 

   
      
      
    </>
  
  
  );
}



 


