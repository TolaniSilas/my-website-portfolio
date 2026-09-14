import type { NextConfig } from "next";

// GitHub Pages needs static files; normal builds retain Next.js server support.
const staticExport = process.env.NEXT_STATIC_EXPORT === "true";
const nextConfig: NextConfig = {
  allowedDevOrigins: ["172.20.10.5"],
  turbopack: { root: process.cwd() },
  ...(staticExport ? { output: "export", images: { unoptimized: true } } : {}),
};
export default nextConfig;
