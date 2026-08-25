/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@medar/ui', '@medar/config', '@medar/types', '@medar/validation']
};

export default nextConfig;
