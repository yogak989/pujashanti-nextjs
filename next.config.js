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
module.exports = {
  async rewrites() {
    return [
      {
        source: '/web_design-sitemap.xml',
        // Ganti dengan IP atau domain asli hosting WordPress Om jika berbeda
        destination: 'https://pujashanti.web.id/web_design-sitemap.xml', 
      },
    ]
  },
}
