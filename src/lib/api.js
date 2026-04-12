const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  if (!API_URL) {
    throw new Error('Environment variable NEXT_PUBLIC_WORDPRESS_API_URL is not defined');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    return null;
  }
  return json.data;
}

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

export async function getWebDesignPost(slug) {
  const data = await fetchAPI(`
    query GetWebDesignByUri($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        date
        slug
        featuredImage {
          node {
            sourceUrl
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
  
  // Mapping agar variabelnya pas dengan [slug].js kita
  if (data?.post) {
    return {
      title: data.post.title,
      content: data.post.content,
      date: data.post.date,
      slug: data.post.slug,
      featured_image: data.post.featuredImage?.node?.sourceUrl || null,
      seo_data: {
        title: data.post.seo?.title || data.post.title,
        description: data.post.seo?.metaDesc || "",
      }
    };
  }
  return null;
}

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
