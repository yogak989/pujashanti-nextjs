const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error('Pujashanti API Error:', json.errors);
    return null;
  }
  return json.data;
}

export async function getWebDesignLandingData() {
  const data = await fetchAPI(`
    query WebDesignLanding {
      webDesigns(first: 20) {
        nodes {
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
  `);
  return data?.webDesigns?.nodes || [];
}

export async function getWebDesignPost(slug) {
  // Kita coba ambil menggunakan SLUG secara langsung
  const data = await fetchAPI(`
    query GetWebDesignBySlug($id: ID!) {
      webDesign(id: $id, idType: SLUG) {
        title
        content
        slug
        date
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
    variables: { id: slug } 
  });

  const post = data?.webDesign;

  if (post) {
    return {
      title: post.title,
      content: post.content,
      slug: post.slug,
      date: post.date,
      featured_image: post.featuredImage?.node?.sourceUrl || null,
      seo_data: {
        title: post.seo?.title || post.title,
        description: post.seo?.metaDesc || "",
      }
    };
  }
  
  return null;
}
