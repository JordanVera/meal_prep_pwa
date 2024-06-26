/** @type {import('next').NextConfig} */

// next.config.mjs

import withPWA from 'next-pwa';

const nextConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development' ? false : true,
})({
  reactStrictMode: true,
  // other Next.js config options here
});

export default nextConfig;
