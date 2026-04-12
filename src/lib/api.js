const BASE_URL = 'https://pujashanti.web.id/wp-json/wp/v2';

export async function getWebDesignLandingData() {
  const res = await fetch(`${BASE_URL}/web_design?_embed&per_page=20`);
  const posts = await res.json();
  
  return posts.map(post => ({
    title: post.title.rendered,
    slug: post.slug,
    excerpt: post.excerpt.rendered,
    featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
  }));
}

export async function getWebDesignPost(slug) {
  // Kita tambahkan _embed agar URL gambar ikut terkirim
  const res = await fetch(`${BASE_URL}/web_design?slug=${slug}&_embed`);
  const posts = await res.json();

  if (posts && posts.length > 0) {
    const post = posts[0];
    
    return {
      title: post.title.rendered,
      content: post.content.rendered,
      date: post.date,
      slug: post.slug,
      // Mengambil gambar dari hasil embed
      featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      // Mengambil data Rank Math (REST API biasanya pakai field ini)
      seo_data: {
        title: post.rank_math_title || post.title.rendered,
        description: post.rank_math_description || post.rank_math_excerpt || "",
      }
    };
  }
  return null;
}
