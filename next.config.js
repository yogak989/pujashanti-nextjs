/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Tambahkan ini untuk memastikan folder fisik tercipta (Mencegah 404 di server)
  trailingSlash: true, 
  images: {
    // remotePatterns ini sudah oke untuk ambil gambar dari WP
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    unoptimized: true, // Tambahkan ini jika deploy ke static hosting/Cloudflare
  },
  // Jika Om deploy di root domain, biarkan kosong. 
  // Tapi jika file build ditaruh di folder /web-design, basePath WAJIB ada.
}

module.exports = nextConfig
