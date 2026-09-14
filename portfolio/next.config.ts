import type { NextConfig } from "next";

// GitHub Pages needs static files; normal builds retain Next.js server support.
const staticExport = process.env.NEXT_STATIC_EXPORT === "true";
const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  ...(staticExport ? { output: "export", images: { unoptimized: true } } : {}),
};
export default nextConfig;
