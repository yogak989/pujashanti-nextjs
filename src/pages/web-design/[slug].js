import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function WebDesignSingular() {
  const router = useRouter();

  // 1. DATA FALLBACK (Mencegah Error jika API WordPress belum narik)
  const post = {
    title: "Loading Project...",
    seo_data: {
      title: "Web Design PujaShanti",
      description: "Layanan Web Design Profesional",
      canonical: "https://pujashanti.web.id",
      og_image: ""
    },
    content: "<p>Memuat konten...</p>"
  };

  // 2. PROTEKSI SCRIPT 404: Jangan proses apapun sampai router siap
  if (!router.isReady) return null;

  return (
    <>
      <Head>
        {/* Gunakan Optional Chaining (?.) agar jika seo_data kosong tidak White Screen */}
        <title>{post.seo_data?.title || post.title}</title>
        <meta name="description" content={post.seo_data?.description || ""} />
        {post.seo_data?.canonical && <link rel="canonical" href={post.seo_data.canonical} />}
        <meta property="og:image" content={post.seo_data?.og_image || ""} />
      </Head>

      <Header />

      <div className="ps-content-wrapper">
        <main className="ps-main-layout">
          <div className="ps-flex-container">
            
            {/* KOLOM KONTEN */}
            <article className="ps-article">
              <h1>{post.title}</h1>
              <div 
                className="ps-body" 
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </article>

            {/* SIDEBAR */}
            <aside className="ps-sidebar">
              <div className="ps-widget">
                <h4>Artikel Terbaru</h4>
                <p>Loop artikel di sini...</p>
              </div>
            </aside>

          </div>
        </main>
      </div>

      {/* FOOTER SEKARANG PASTI TERLIHAT */}
      <Footer />

      <style jsx>{`
        .ps-content-wrapper {
          padding-top: 90px;
          background: #f8fafc;
          min-height: 100vh;
        }
        .ps-main-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .ps-flex-container {
          display: flex;
          gap: 30px;
        }
        .ps-article {
          flex: 0 0 70%;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
        }
        .ps-sidebar {
          flex: 0 0 30%;
        }
        .ps-widget {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
        }
        @media (max-width: 991px) {
          .ps-flex-container { flex-direction: column; }
          .ps-article, .ps-sidebar { flex: 0 0 100%; }
        }
      `}</style>
    </>
  );
}
