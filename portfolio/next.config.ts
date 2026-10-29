import type { NextConfig } from 'next';

// This application requires a Next.js server for SSR, authentication, and publishing.
const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.20.10.5'],
  turbopack: { root: process.cwd() },
  experimental: { serverActions: { bodySizeLimit: '6mb' } },
};
export default nextConfig;
