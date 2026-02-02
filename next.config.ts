import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "export", // Enables static export (React-only part)
//   images: {
//     unoptimized: true, // Required for static exports
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//    reactStrictMode: true,
//   output: "export",
//   distDir: "out", // Forces the output directory name
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//     ],
//   },
//   /* --- Add the experimental block here --- */
//   experimental: {
//     staticGenerationRetryCount: 1,
//   },
// };

// export default nextConfig;
