/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
        // port: "",
        // pathname: "api/v1/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        // port: "",
        // pathname: "api/v1/**",
      },
    ],
  },
};

module.exports = nextConfig;
