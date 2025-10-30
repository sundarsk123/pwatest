// next.config.js
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  maximumFileSizeToCacheInBytes: 50 * 1024 * 1024, // allow up to 50MB
  disable: process.env.NODE_ENV === 'development', // disable in dev
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dezvolta.in',
      },
    ],
  },
});

export default nextConfig;
