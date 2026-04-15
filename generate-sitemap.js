const fs = require('fs');

async function generate() {
  const query = `
    query GetSitemapPosts {
      webDesigns(first: 100) {
        nodes {
          slug
          date
        }
      }
    }
  `;

  console.log('⏳ Mengambil data dari WordPress untuk Sitemap...');

  try {
    const response = await fetch('https://pujashanti.web.id/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      body: JSON.stringify({ query }),
    });

    // Ambil teks mentah dulu untuk validasi
    const rawText = await response.text();

    // Validasi apakah respon berisi HTML bukannya JSON
    if (rawText.trim().startsWith('<html') || rawText.trim().startsWith('<!DOCTYPE')) {
      throw new Error('WordPress mengembalikan HTML (mungkin diblokir firewall atau salah URL). Pastikan endpoint GraphQL publik.');
    }

    const json = JSON.parse(rawText);
    const posts = json.data?.webDesigns?.nodes || [];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://pujashanti.web.id/web-design</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${posts.map(post => `
    <url>
        <loc>https://pujashanti.web.id/web-design/${post.slug}</loc>
        <lastmod>${post.date ? new Date(post.date).toISOString() : new Date().toISOString()}</lastmod>
    </url>`).join('')}
</urlset>`;

    // Pastikan folder public ada
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }

    fs.writeFileSync('public/web-design-sitemap.xml', sitemap);
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('⚠️ Peringatan Sitemap:', error.message);
    console.log('💡 Melanjutkan build tanpa sitemap baru agar CSS tetap ter-deploy...');
    // Kita tidak menggunakan process.exit(1) agar build Next.js tetap berjalan
  }
}

generate();
