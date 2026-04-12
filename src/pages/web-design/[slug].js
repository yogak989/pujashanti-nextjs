import Head from 'next/head';
import { getWebDesignPost } from '../../lib/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// 1. WAJIB ADA untuk Cloudflare Pages
export const runtime = 'experimental-edge'; 

export default function WebDesignDetail({ post }) {
  if (!post) {
    return <div style={{ textAlign: 'center', padding: '100px 0' }}>Halaman tidak ditemukan...</div>;
  }

  const seoTitle = post.seo_data?.title || `${post.title} | PujaShanti Web Design`;
  const seoDesc = post.seo_data?.description || "";

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        {post.seo_data?.canonical && <link rel="canonical" href={post.seo_data.canonical} />}
        {post.seo_data?.og_image && <meta property="og:image" content={post.seo_data.og_image} />}
      </Head>

      <Header />

      <main style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <article className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
          <header style={{ marginBottom: '30px' }}>
            <h1 style={{ fontSize: '2.5rem' }}>{post.title}</h1>
            <time style={{ color: '#888' }}>{new Date(post.date).toLocaleDateString('id-ID')}</time>
          </header>

          <div 
            className="entry-content" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>

      <Footer />
    </>
  );
}

// 2. getStaticPaths harus tetap ada
export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

// 3. getStaticProps untuk ambil data dari WordPress
export async function getStaticProps({ params }) {
  try {
    const post = await getWebDesignPost(params.slug);
    if (!post) return { notFound: true };

    return {
      props: { post },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
}
