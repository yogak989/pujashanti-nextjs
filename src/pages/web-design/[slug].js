import Head from 'next/head';
import { getWebDesignPost } from '../../lib/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WebDesignDetail({ post }) {
  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <p>Halaman tidak ditemukan...</p>
        <a href="/web-design/">Kembali ke Gallery</a>
      </div>
    );
  }

  // Data SEO dari Rank Math (Jika sudah ada di API)
  const seoTitle = post.seo_data?.title || `${post.title} | PujaShanti Web Design`;
  const seoDesc = post.seo_data?.description || "";

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        {post.seo_data?.canonical && <link rel="canonical" href={post.seo_data.canonical} />}
      </Head>

      <Header />

      <main className="ps-main-singular" style={{ paddingTop: '100px', minHeight: '100vh', background: '#f9f9f9' }}>
        <article className="container" style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          
          <header style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#1a3a5a' }}>{post.title}</h1>
            <time style={{ color: '#888', fontSize: '0.9rem' }}>
              📅 {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </header>

          {/* Isi Konten */}
          <div 
            className="entry-content" 
            style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#333' }}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>

      <Footer />

      <style jsx global>{`
        .entry-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 20px 0;
        }
        .entry-content h2 {
          margin-top: 40px;
          color: #1a3a5a;
        }
        .container {
          width: 95%;
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  // Kita gunakan paths kosong + fallback blocking agar halaman baru di WP otomatis ter-generate di Next.js
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const post = await getWebDesignPost(params.slug);
    
    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
      revalidate: 60, // Update konten otomatis setiap 1 menit tanpa rebuild ulang
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { notFound: true };
  }
}
