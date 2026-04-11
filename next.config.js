/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Memaksa seluruh aplikasi menggunakan runtime edge secara global
  experimental: {
    runtime: 'experimental-edge',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
    ],
  },
}

module.exports = nextConfig
