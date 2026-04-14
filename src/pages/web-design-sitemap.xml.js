const EXTERNAL_DATA_URL = 'https://pujashanti.web.id/web-design';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
     </url>
     ${posts
       .map(({ slug, date }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
           <lastmod>${new Date(date).toISOString()}</lastmod>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps akan menangani semuanya
}

export async function getServerSideProps({ res }) {
  // 1. Ambil data dari WordPress GraphQL
  const request = await fetch('https://pujashanti.web.id/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetSitemapPosts {
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

  const data = await request.json();
  const posts = data?.data?.webDesigns?.nodes || [];

  // 2. Generate XML sitemap dengan data post
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // Kirim sitemap ke browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
