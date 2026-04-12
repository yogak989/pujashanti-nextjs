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
    throw new Error('Gagal mengambil data dari API WordPress');
  }

  return json.data;
}

/**
 * Mengambil daftar semua post Web Design (untuk Landing Page)
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
        }
      }
    }
  `);
  // WPGraphQL terkadang mengembalikan data dalam 'posts' jika CPT tidak terdaftar khusus
  return data?.posts?.nodes || [];
}

/**
 * Mengambil detail satu post Web Design berdasarkan Slug
 * Menggunakan idType: URI agar lebih akurat dengan struktur /web-design/slug
 */
export async function getWebDesignPost(slug) {
  const data = await fetchAPI(`
    query GetWebDesignByUri($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        date
        databaseId
        slug
      }
    }
  `, { 
    variables: { 
      // Kita pastikan format ID sesuai dengan URI di WordPress
      id: `/web-design/${slug}/` 
    } 
  });
  
  return data?.post;
}

/**
 * Fungsi tambahan  membuat daftar sitemap (Opsional)
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
