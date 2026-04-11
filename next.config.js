/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Kita matikan fitur yang bikin berat proses Edge
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
}
module.exports = nextConfig
