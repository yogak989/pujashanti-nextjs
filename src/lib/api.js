const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Warning:', json.errors);
  }
  return json.data;
}

/**
 * MENGAMBIL SINGLE POST (Untuk Halaman Detail)
 */
export async function getWebDesignPost(slug) {
  const data = await fetchAPI(`
    query GetWebDesignByUri($id: ID!) {
      webDesign(id: $id, idType: URI) {
        title
        content
        date
        slug
        rankMathTitle
        rankMathDescription
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `, { 
    variables: { id: `/web-design/${slug}/` } 
  });
  
  if (data?.webDesign) {
    const post = data.webDesign;
    return {
      title: post.title,
      content: post.content,
      date: post.date,
      slug: post.slug,
      featured_image: post.featuredImage?.node?.sourceUrl || null,
      seo_data: {
        // Logika Fallback: Pakai Rank Math, kalau kosong pakai Title WP
        title: post.rankMathTitle || post.title,
        description: post.rankMathDescription || "",
      }
    };
  }
  return null;
}

/**
 * MENGAMBIL LIST POST (Untuk Landing Page / Loop Test)
 */
export async function getWebDesignLandingData() {
  const data = await fetchAPI(`
    query WebDesignLanding {
      webDesigns(first: 20) {
        nodes {
          title
          slug
          excerpt
          date
          rankMathDescription
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `);
  return data?.webDesigns?.nodes || [];
}

/**
 * UNTUK GENERATE PATH (Sitemap/Build)
 */
export async function getAllWebDesignSlugs() {
  const data = await fetchAPI(`
    query AllWebDesignSlugs {
      webDesigns(first: 100) {
        nodes {
          slug
        }
      }
    }
  `);
  return data?.webDesigns?.nodes || [];
}
