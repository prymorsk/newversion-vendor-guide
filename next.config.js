/** @type {import('next').NextConfig} */

const allowedDevOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  
];

const nextConfig = {
  reactStrictMode: false,
  //swcMinify: true,

  images: {
    unoptimized: true,
  },

  env: {
    BASE_API_URL: "https://dev.vendorguideonline.com/api/",
    BASE_LARAVEL_URL: "https://dev.vendorguideonline.com/",
    NEXT_PUBLIC_API_URL: "https://dev.vendorguideonline.com/api/",
    NEXT_PUBLIC_GOOGLE_MAP_API_KEY: "AIzaSyAu0nuFuRxKY9akmvj3AqEBZByIc1vQP3g",
    GOOGLE_MAP_API_KEY: "AIzaSyAu0nuFuRxKY9akmvj3AqEBZByIc1vQP3g---",
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY:
      "pk_test_51HD2bgHFZYAuYDw1kf3xS6rQbV0cnei6ggqB6OTjfuWWYODN2kfX8dEuJBtentqIMfG4y6N9LPXFuLxYjZO1ETCe00MSuqop00",
    SITE_NAME: "Vendor Guide",
    SITE_ID: "Vendor Guide",
  },

  //eslint: {
   // ignoreDuringBuilds: true,
  //},

  async redirects() {
    return [
      { source: "/manager", destination: "/login", permanent: true },
      { source: "/vendor", destination: "/login", permanent: true },
      { source: "/company", destination: "/login", permanent: true },
      { source: "/search", destination: "/", statusCode: 301 },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dev.vendorguideonline.com/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "development"
                ? allowedDevOrigins.join(",")
                : "https://your-production-domain.com",
          },
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

  // Example: If you want jQuery globally (commented out in your original)
  // webpack: (config, { webpack }) => {
  //   config.plugins.push(
  //     new webpack.ProvidePlugin({
  //       $: "jquery",
  //       jQuery: "jquery",
  //       "window.jQuery": "jquery",
  //     })
  //   );
  //   return config;
  // },
};

module.exports = nextConfig;
