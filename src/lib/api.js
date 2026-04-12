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
    console.error("GraphQL Error Details:", json.errors);
    return null; // Kembalikan null agar tidak crash
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
  // Gunakan URI jika SLUG tidak terdeteksi, ini lebih akurat di WPGraphQL
  const data = await fetchAPI(`
    query WebDesignBySlug($id: ID!) {
      webDesign(id: $id, idType: URI) {
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
    variables: { 
      id: `/web-design/${slug}/` // Menggunakan path lengkap sering lebih stabil
    } 
  });

  // Jika URI gagal, coba fallback ke SLUG murni
  let post = data?.webDesign;
  
  if (!post) {
    const dataSlug = await fetchAPI(`
      query WebDesignBySlug($id: ID!) {
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
    `, { variables: { id: slug } });
    post = dataSlug?.webDesign;
  }

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
