export const runtime = 'experimental-edge';
import { getWebDesignPost } from '../../lib/api';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WebDesignPost({ post }) {
  if (!post) return <div style={{ textAlign: 'center', padding: '100px' }}>Halaman tidak ditemukan...</div>;

  const seoTitle = post.seo_data?.title || `${post.title} | PujaShanti`;
  const seoDesc = post.seo_data?.description || "";
  
  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        {/* Open Graph untuk Share ke WA/Sosmed */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />

      <main className="ps-main-container">
        <article className="ps-article-card">
          
          {/* FEATURED IMAGE */}
          {post.featured_image && (
            <div className="ps-featured-image-wrapper">
              <img 
                src={post.featured_image} 
                alt={post.title} 
                className="ps-featured-img"
              />
            </div>
          )}

          <div className="ps-content-padding">
            {/* JUDUL H1 */}
            <h1 className="ps-post-title">{post.title}</h1>

            {/* META PROFIL (Penulis & Tanggal) */}
            <div className="ps-post-meta">
              <div className="ps-author">
                <img 
                  src="https://pujashanti.web.id/wp-content/uploads/2026/04/pujashanti-logo-100x100-1.webp" 
                  alt="Admin" 
                  className="ps-author-img" 
                />
                <span>Penulis: <strong>Admin Pujashanti</strong></span>
              </div>
              <div className="ps-date">
                <span>🗓️ {formattedDate}</span>
              </div>
            </div>

            <div className="ps-divider"></div>

            {/* ISI KONTEN */}
            <div 
              className="ps-entry-content"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </article>
      </main>

      <Footer />

      <style jsx global>{`
        .ps-main-container {
          padding-top: 100px;
          padding-bottom: 60px;
          background-color: #f8fafc;
          min-height: 100vh;
        }
        .ps-article-card {
          max-width: 850px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .ps-featured-image-wrapper {
          width: 100%;
          max-height: 450px;
          overflow: hidden;
          background: #eee;
        }
        .ps-featured-img {
          width: 100%;
          height: auto;
          object-fit: cover;
          display: block;
        }
        .ps-content-padding {
          padding: 40px;
        }
        .ps-post-title {
          font-size: 2.8rem;
          color: #1a3a5a;
          line-height: 1.2;
          margin-bottom: 20px;
          font-weight: 800;
        }
        .ps-post-meta {
          display: flex;
          align-items: center;
          gap: 25px;
          margin-bottom: 30px;
          font-size: 0.95rem;
          color: #64748b;
          flex-wrap: wrap;
        }
        .ps-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ps-author-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
        }
        .ps-divider {
          height: 1px;
          background: #e2e8f0;
          margin-bottom: 35px;
        }
        .ps-entry-content {
          line-height: 1.8;
          color: #334155;
          font-size: 1.2rem;
        }
        .ps-entry-content p { margin-bottom: 25px; }
        .ps-entry-content h2 { margin-top: 40px; color: #1a3a5a; font-size: 1.8rem; }
        .ps-entry-content img { max-width: 100%; height: auto; border-radius: 12px; margin: 25px 0; }
        
        @media (max-width: 768px) {
          .ps-content-padding { padding: 25px; }
          .ps-post-title { font-size: 1.85rem; }
          .ps-post-meta { gap: 15px; }
          .ps-main-container { padding-top: 85px; }
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  try {
    const post = await getWebDesignPost(params.slug);
    if (!post) return { notFound: true };
    return { props: { post }, revalidate: 60 };
  } catch (e) {
    return { notFound: true };
  }
}
