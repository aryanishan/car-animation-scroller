import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for GitHub Pages (generates static HTML files)
  basePath: "/car-animation-scroller", // Ensures assets load correctly from your sub-directory URL
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
};

export default nextConfig;
