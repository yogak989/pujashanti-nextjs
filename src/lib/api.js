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
 * UNTUK HALAMAN DETAIL ([slug].js)
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
        title: post.rankMathTitle || post.title,
        description: post.rankMathDescription || "",
      }
    };
  }
  return null;
}

/**
 * UNTUK HALAMAN TEST LOOP (test-loop.js)
 * Ini fungsi yang tadi hilang dan bikin build gagal
 */
export async function getTestLoopData() {
  const data = await fetchAPI(`
    query TestLoopWebDesign {
      webDesigns(first: 20) {
        edges {
          node {
            id
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
    }
  `);
  return data?.webDesigns?.edges || [];
}

/**
 * UNTUK LANDING PAGE UTAMA
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
 * UNTUK GENERATE PATHS
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
