import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static export: deployable to GitHub Pages, Vercel, Netlify or any static host.
  output: "export",
  basePath: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
