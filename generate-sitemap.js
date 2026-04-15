const fs = require('fs');
const path = require('path');

// Ganti URL ini dengan URL domain Next.js Anda
const SITE_URL = 'https://pujashanti.web.id'; 

async function generateSitemap() {
  console.log('⏳ Mengambil data dari WordPress untuk sitemap...');
  
  // Ambil API URL dari environment variable
  const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!API_URL) {
    console.error('❌ Error: NEXT_PUBLIC_WORDPRESS_API_URL tidak ditemukan.');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query AllWebDesignSlugs {
            webDesigns(first: 100) {
              nodes {
                slug
                date
              }
            }
          }
        `,
      }),
    });

    const contentType = response.headers.get("content-type");
    
    // Proteksi jika yang kembali adalah HTML (error 403/404) bukan JSON
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      console.error('❌ WordPress mengembalikan HTML (bukan JSON). Cek URL atau Firewall.');
      console.log('Respon singkat:', errorText.substring(0, 150));
      return; 
    }

    const json = await response.json();
    const posts = json.data?.webDesigns?.nodes || [];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${SITE_URL}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${SITE_URL}/web-design</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    ${posts
      .map((post) => {
        return `
    <url>
        <loc>${SITE_URL}/web-design/${post.slug}</loc>
        <lastmod>${new Date(post.date).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>`;
      })
      .join('')}
</urlset>`;

    // Tulis file ke folder public
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    
    fs.writeFileSync(path.join(publicDir, 'web-design-sitemap.xml'), sitemap);
    console.log('✅ Berhasil! web-design-sitemap.xml telah dibuat.');

  } catch (error) {
    console.error('❌ Terjadi kesalahan saat generate sitemap:', error.message);
    // Kita tidak menggunakan throw error agar build Next.js di Cloudflare tidak gagal
  }
}

generateSitemap();
