/** @type {import('next').NextConfig} */



const nextConfig = {
  reactStrictMode: false,

  images: {
    unoptimized: true,
  },

  /**
   * ✅ Required for Next.js 16 proxy routes
   */
  //experimental: {
   // proxy: true,
  //},

  /**
   * ⚠️ NOTE:
   * env is still supported, but NEXT_PUBLIC_* is preferred
   * Kept exactly as-is to avoid breaking existing code
   */
  env: {
    BASE_API_URL: "https://dev.vendorguideonline.com/api/",
    BASE_LARAVEL_URL: "https://dev.vendorguideonline.com/",
    NEXT_PUBLIC_API_URL: "https://dev.vendorguideonline.com/api/",
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY:
      "AIzaSyAu0nuFuRxKY9akmvj3AqEBZByIc1vQP3g",
    GOOGLE_MAP_API_KEY:
      "AIzaSyAu0nuFuRxKY9akmvj3AqEBZByIc1vQP3g---",
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY:
      "pk_test_51HD2bgHFZYAuYDw1kf3xS6rQbV0cnei6ggqB6OTjfuWWYODN2kfX8dEuJBtentqIMfG4y6N9LPXFuLxYjZO1ETCe00MSuqop00",
    SITE_NAME: "Vendor Guide",
    SITE_ID: "Vendor Guide",
  },

  /**
   * ✅ Redirects (no change in behavior)
   */
  async redirects() {
    return [
      { source: "/manager", destination: "/login", permanent: true },
      { source: "/vendor", destination: "/login", permanent: true },
      { source: "/company", destination: "/login", permanent: true },
      { source: "/search", destination: "/", permanent: true },
    ];
  },

  /**
   * ✅ API rewrite (fixed destination path)
   * Your previous config was missing `/api`
   */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://dev.vendorguideonline.com/api/:path*",
      },
    ];
  },

  /**
   * ✅ CORS headers (Next.js 16 compatible)
   */
    async headers() {
      return [
        {
          // matching all API routes
          // https://vercel.com/guides/how-to-enable-cors
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ];
    },


  
};

module.exports = nextConfig;
