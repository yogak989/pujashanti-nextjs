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
// Contoh di next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*.xml',
        destination: 'https://pujashanti.web.id/:path*.xml', // Pastikan mengarah ke backend WP asli
      },
    ]
  },
}
