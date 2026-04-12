import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WebDesignSingular() {
  const router = useRouter();

  // Data Fallback agar tidak crash saat loading
  const post = {
    title: "Memuat...",
    seo_data: {
      title: "Loading...",
      description: "",
      canonical: "",
      og_image: ""
    },
    content: ""
  };

  // Proteksi Router
  if (!router.isReady) return null;

  return (
    <>
      <Head>
        <title>{post.seo_data?.title || "Web Design PujaShanti"}</title>
        <meta name="description" content={post.seo_data?.description || ""} />
        {post.seo_data?.canonical && <link rel="canonical" href={post.seo_data.canonical} />}
      </Head>

      <Header />

      <main className="ps-single-container">
        <article className="ps-post-content">
          <header className="ps-post-header">
            <h1>{post.title}</h1>
          </header>
          
          <div 
            className="ps-entry-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>
      </main>

      <Footer />

      <style jsx>{`
        .ps-single-container {
          padding-top: 100px;
          max-width: 800px;
          margin: 0 auto;
          padding-left: 20px;
          padding-right: 20px;
          min-height: 80vh;
        }
        .ps-post-header h1 {
          font-size: 2.5rem;
          color: #1a202c;
          margin-bottom: 30px;
        }
        .ps-entry-content {
          line-height: 1.8;
          color: #2d3748;
          font-size: 1.1rem;
        }
      `}</style>
    </>
  );
}
