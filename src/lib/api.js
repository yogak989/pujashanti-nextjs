const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

/**
 * Fungsi dasar untuk fetch ke WPGraphQL
 */
async function fetchAPI(query, { variables } = {}) {
  if (!API_URL) {
    throw new Error('Environment variable NEXT_PUBLIC_WORDPRESS_API_URL is not defined di Dashboard Cloudflare');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    // Kita return null agar build tidak langsung crash saat satu data bermasalah
    return null; 
  }

  return json.data;
}

/**
 * Mengambil daftar post Web Design untuk Landing Page
 */
export async function getWebDesignLandingData() {
  const data = await fetchAPI(`
    query WebDesignLanding {
      posts(where: { postType: "web_design" }, first: 20) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `);
  return data?.posts?.nodes || [];
}

/**
 * Mengambil detail satu post Web Design (Versi Lengkap dengan Template & SEO)
 */
export async function getWebDesignPost(slug) {
  const data = await fetchAPI(`
    query GetWebDesignByUri($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        date
        slug
        template {
          ... on Template_SEOLandingPage {
            templateName
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        seo {
          title
          metaDesc
        }
      }
    }
  `, { 
    variables: { 
      id: `/web-design/${slug}/` 
    } 
  });
  
  if (data?.post) {
    const post = data.post;
    return {
      title: post.title,
      content: post.content,
      date: post.date,
      slug: post.slug,
      templateName: post.template?.templateName || null,
      featured_image: post.featuredImage?.node?.sourceUrl || null,
      alt_text: post.featuredImage?.node?.altText || post.title,
      seo_data: {
        title: post.seo?.title || post.title,
        description: post.seo?.metaDesc || "",
      }
    };
  }
  return null;
}

/**
 * Fungsi Eksperimen Loop (Menggunakan webDesigns edges)
 */
export async function getTestLoopData() {
  const data = await fetchAPI(`
    query TestLoopWebDesign {
      webDesigns(first: 10) {
        edges {
          node {
            id
            title
            slug
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `);
  return data?.webDesigns?.edges || [];
}

/**
 * Fungsi untuk daftar sitemap
 */
export async function getAllWebDesignSlugs() {
  const data = await fetchAPI(`
    query AllWebDesignSlugs {
      posts(where: { postType: "web_design" }, first: 100) {
        nodes {
          slug
        }
      }
    }
  `);
  return data?.posts?.nodes || [];
}
