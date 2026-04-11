/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Kita matikan fitur yang bikin bentrok dengan manifest di Cloudflare
  output: 'standalone', 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Mengizinkan semua gambar dari WordPress
      },
    ],
  },
}

module.exports = nextConfig
