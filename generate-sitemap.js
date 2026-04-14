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

  console.log('⏳ Mengambil data dari WordPress...');

  try {
    const response = await fetch('https://pujashanti.web.id/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
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
    console.error('❌ Gagal membuat sitemap:', error);
    process.exit(1); // Gagalkan build jika sitemap gagal agar kita tahu
  }
}

generate();
