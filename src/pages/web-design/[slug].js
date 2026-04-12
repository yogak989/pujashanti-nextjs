import Head from 'next/head';
import { getWebDesignPost } from '../../lib/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Wajib gunakan ini karena environment Cloudflare Om memintanya
export const runtime = 'experimental-edge';

export default function WebDesignDetail({ post }) {
  // 1. Penanganan jika data post tidak ditemukan
  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <p>Halaman tidak ditemukan...</p>
        <a href="/web-design/">Kembali ke Gallery</a>
      </div>
    );
  }

  // 2. Mapping Data SEO Rank Math (Mencegah Error jika data kosong)
  const seoTitle = post.seo_data?.title || `${post.title} | PujaShanti`;
  const seoDesc = post.seo_data?.description || "";
  const canonical = post.seo_data?.canonical || `https://pujashanti.web.id/web-design/${post.slug}/`;
  const ogImage = post.seo_data?.og_image || "";

  return (
    <>
      <Head>
        {/* SEO Dasar */}
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:url" content={canonical} />
        {ogImage && <meta property="og:image" content={ogImage} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Head>

      <Header />

      <main className="ps-main-wrapper">
        <article className="ps-container">
          <header className="ps-post-header">
            <h1>{post.title}</h1>
            <div className="ps-meta">
              <span>📅 {new Date(post.date).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            </div>
          </header>

          <div 
            className="ps-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>

      <Footer />

      <style jsx>{`
        .ps-main-wrapper {
          padding-top: 110px; /* Jarak agar tidak tertutup Header Fixed */
          padding-bottom: 60px;
          min-height: 100vh;
          background-color: #fcfcfc;
        }
        .ps-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
          background: #ffffff;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }
        .ps-post-header {
          margin-bottom: 30px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 20px;
        }
        .ps-post-header h1 {
          font-size: 2.5rem;
          color: #1a202c;
          line-height: 1.2;
          margin-bottom: 10px;
        }
        .ps-meta {
          color: #a0aec0;
          font-size: 0.9rem;
        }
        .ps-content {
          line-height: 1.8;
          color: #2d3748;
          font-size: 1.15rem;
        }
        .ps-content :global(img) {
          max-width: 100%;
          height: auto;
          border-radius: 10px;
          margin: 25px 0;
        }
        .ps-content :global(h2) {
          margin-top: 40px;
          color: #2d3748;
        }
        @media (max-width: 768px) {
          .ps-container { padding: 20px; width: 95%; }
          .ps-post-header h1 { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}

// Mengambil list slug untuk build awal
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // Generate halaman baru otomatis saat diakses
  };
}

// Mengambil data dari API WordPress
export async function getStaticProps({ params }) {
  try {
    const post = await getWebDesignPost(params.slug);

    if (!post) {
      return { notFound: true };
    }

    return {
      props: { post },
      revalidate: 60, // Refresh data setiap 60 detik jika ada perubahan di WP
    };
  } catch (error) {
    console.error("Gagal mengambil data post:", error);
    return { notFound: true };
  }
}
