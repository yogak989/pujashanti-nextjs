/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  // Memaksa Next.js menggunakan Build ID yang konsisten
  generateBuildId: async () => 'build-pujashanti',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    unoptimized: true,
  },
}
module.exports = nextConfig
