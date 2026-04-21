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
 * MUTASI: MENGIRIM KOMENTAR BARU
 */
export async function submitComment({ author, authorEmail, content, commentOn }) {
  const data = await fetchAPI(`
    mutation CREATE_COMMENT(
      $author: String!,
      $authorEmail: String!,
      $content: String!,
      $commentOn: Int!
    ) {
      createComment(input: {
        author: $author,
        authorEmail: $authorEmail,
        content: $content,
        commentOn: $commentOn
      }) {
        success
        comment {
          id
          date
          content
        }
      }
    }
  `, {
    variables: {
      author: String(author),      // Memastikan nama adalah String
      authorEmail: String(authorEmail), // Memastikan email adalah String
      content: content,
      commentOn: parseInt(commentOn) // WAJIB: Memastikan ID adalah Integer (angka), bukan string
    }
  });

  return data?.createComment;
}
/**
 * QUERY: MENGAMBIL DAFTAR KOMENTAR PER POSTINGAN
 */
export async function getCommentsByPostId(databaseId) {
  const data = await fetchAPI(`
    query GetComments($contentId: ID!) {
      comments(where: {contentId: $contentId, orderby: COMMENT_DATE, order: ASC}) {
        nodes {
          id
          date
          content
          author {
            node {
              name
            }
          }
        }
      }
    }
  `, {
    variables: { contentId: databaseId.toString() }
  });

  return data?.comments?.nodes || [];
}

/**
 * UNTUK HALAMAN DETAIL ([slug].js)
 */
export async function getWebDesignPost(slug) {
  const data = await fetchAPI(`
    query GetWebDesignByUri($id: ID!) {
      webDesign(id: $id, idType: URI) {
        databaseId
        title
        content
        date
        slug
        excerpt
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

    // --- LOGIKA CERDAS UNTUK SEO DESCRIPTION ---
    // 1. Coba ambil dari Rank Math
    // 2. Jika null, ambil dari Excerpt dan hapus tag HTML-nya
    // 3. Jika masih null, gunakan string default
    const rawExcerpt = post.excerpt || "";
    const cleanExcerpt = rawExcerpt
      .replace(/<[^>]*>?/gm, '') // Hapus tag HTML
      .replace(/\s+/g, ' ')      // Bersihkan spasi berlebih
      .trim();

    return {
      databaseId: post.databaseId,
      title: post.title,
      content: post.content,
      date: post.date,
      slug: post.slug,
      featured_image: post.featuredImage?.node?.sourceUrl || null,
      seo_data: {
        title: post.rankMathTitle || post.title,
        // Fallback ke excerpt jika rankMathDescription null
        description: post.rankMathDescription || cleanExcerpt.substring(0, 160) || "Jasa pembuatan website profesional dan cepat oleh Pujashanti.",
      }
    };
  }
  return null;
}

export async function getSearchWebDesigns(searchTerm) {
  const data = await fetchAPI(
    `
    query SearchWebDesigns($searchTerm: String!) {
      webDesigns(where: { search: $searchTerm }) {
        nodes {
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        searchTerm,
      },
    }
  );
  return data?.webDesigns?.nodes;
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
