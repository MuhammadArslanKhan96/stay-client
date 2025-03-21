/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['rwps.stays.com.br', 'assets.guesty.com'], // Add both domains here
  },
};

export default nextConfig;
