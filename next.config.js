/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Serve static assets from the frontend port in development
  // assetPrefix:
  //   process.env.NODE_ENV === "development" ? "http://localhost:3001" : "",

  // Enable App Router if necessary
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
