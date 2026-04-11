/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    domains: ['pujashanti.web.id'], // Izinkan gambar dari domain utama
  },
}

module.exports = nextConfig