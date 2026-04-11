/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Matikan fitur yang memicu munculnya manifest di Edge
  experimental: {
    serverSourceMaps: false,
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
