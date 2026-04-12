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
    console.error(json.errors);
    throw new Error('Failed to fetch API');
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
  const data = await fetchAPI(`
    query WebDesignBySlug($id: ID!, $idType: WebDesignIdType!) {
      webDesign(id: $id, idType: $idType) {
        title
        content
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
      id: slug, 
      idType: 'SLUG' 
    } 
  });

  // Mapping agar sesuai dengan variabel di [slug].js
  if (data?.webDesign) {
    return {
      title: data.webDesign.title,
      content: data.webDesign.content,
      date: data.webDesign.date,
      featured_image: data.webDesign.featuredImage?.node?.sourceUrl || null,
      seo_data: {
        title: data.webDesign.seo?.title || data.webDesign.title,
        description: data.webDesign.seo?.metaDesc || "",
      }
    };
  }
  return null;
}
