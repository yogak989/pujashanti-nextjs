import { getWebDesignPost } from '../../lib/api';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WebDesignPost({ post }) {
  if (!post) return <div style={{ textAlign: 'center', padding: '100px' }}>Memuat halaman...</div>;

  const formattedDate = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <Head>
        <title>{post.seo_data.title}</title>
        <meta name="description" content={post.seo_data.description} />
      </Head>

      <Header />

      <main className="container">
        <article className="article-wrapper">
          
          {/* Label Template jika ada */}
          {post.templateName && (
            <span className="template-label">{post.templateName}</span>
          )}

          {/* Featured Image */}
          {post.featured_image && (
            <div className="featured-image-box">
              <img src={post.featured_image} alt={post.alt_text} className="img-fluid" />
            </div>
          )}

          <div className="content-padding">
            <h1 className="title">{post.title}</h1>
            
            <div className="meta">
              <span>Oleh <strong>Admin Pujashanti</strong></span>
              <span className="divider">|</span>
              <span>{formattedDate}</span>
            </div>

            <hr className="line" />

            {/* Isi Artikel dari WordPress */}
            <div 
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </article>
      </main>

      <Footer />

      <style jsx global>{`
        .container {
          padding: 120px 20px 60px;
          background-color: #f4f7f6;
          min-height: 100vh;
        }
        .article-wrapper {
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
        }
        .template-label {
          position: absolute;
          top: 20px;
          right: 20px;
          background: #1a3a5a;
          color: #fff;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: bold;
          z-index: 5;
        }
        .featured-image-box {
          width: 100%;
          max-height: 450px;
          overflow: hidden;
        }
        .img-fluid {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .content-padding {
          padding: 40px;
        }
        .title {
          font-size: 2.5rem;
          color: #1a3a5a;
          line-height: 1.2;
          margin-bottom: 15px;
          font-weight: 800;
        }
        .meta {
          color: #6c757d;
          font-size: 0.9rem;
          margin-bottom: 25px;
          display: flex;
          gap: 10px;
        }
        .line {
          border: 0;
          border-top: 1px solid #eee;
          margin-bottom: 30px;
        }
        .entry-content {
          line-height: 1.8;
          font-size: 1.15rem;
          color: #333;
        }
        .entry-content p { margin-bottom: 20px; }
        .entry-content h2 { margin-top: 35px; color: #1a3a5a; }

        @media (max-width: 768px) {
          .title { font-size: 1.8rem; }
          .content-padding { padding: 25px; }
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getWebDesignPost(params.slug);
  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 60 };
}
