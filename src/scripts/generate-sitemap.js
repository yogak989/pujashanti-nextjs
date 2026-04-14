const fs = require('fs');
const fetch = require('node-fetch');

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

  const response = await fetch('https://pujashanti.web.id/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const { data } = await response.json();
  const posts = data?.webDesigns?.nodes || [];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://pujashanti.web.id/web-design</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${posts.map(post => `
    <url>
        <loc>https://pujashanti.web.id/web-design/${post.slug}</loc>
        <lastmod>${new Date(post.date).toISOString()}</lastmod>
    </url>`).join('')}
</urlset>`;

  // Tulis file ke folder public agar bisa diakses langsung
  fs.writeFileSync('public/web-design-sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
}

generate();
