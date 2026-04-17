const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://pujashanti.web.id'; 

async function generateSitemap() {
  console.log('⏳ Mengambil data dari WordPress untuk sitemap...');
  
  const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!API_URL) {
    console.error('❌ Error: NEXT_PUBLIC_WORDPRESS_API_URL tidak ditemukan.');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // PENAMBAHAN: User-Agent agar tidak diblokir Firewall/OpenResty (Error 415)
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json'
      },
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
    
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      console.error('❌ WordPress mengembalikan HTML (bukan JSON).');
      console.log('Respon singkat:', errorText.substring(0, 150));
      return; 
    }

    const json = await response.json();
    const allNodes = json.data?.webDesigns?.nodes || [];

    // FILTER: Memastikan slug "search" atau slug kosong tidak masuk ke sitemap
    const posts = allNodes.filter(post => post.slug && post.slug !== 'search');

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
        // Validasi tanggal agar tidak error saat toISOString()
        const lastMod = post.date ? new Date(post.date).toISOString() : new Date().toISOString();
        return `
    <url>
        <loc>${SITE_URL}/web-design/${post.slug}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
    </url>`;
      })
      .join('')}
</urlset>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
    
    fs.writeFileSync(path.join(publicDir, 'web-design-sitemap.xml'), sitemap);
    console.log(`✅ Berhasil! web-design-sitemap.xml dibuat dengan ${posts.length} artikel.`);

  } catch (error) {
    console.error('❌ Terjadi kesalahan saat generate sitemap:', error.message);
  }
}

generateSitemap();
