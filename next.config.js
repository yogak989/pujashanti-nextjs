/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hapus baris basePath: '/web-design'
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
}
module.exports = nextConfig
